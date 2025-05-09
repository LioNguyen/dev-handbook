// src/domains/canvas/hooks/useAutoLayout.ts
import { Node, Position, useReactFlow, XYPosition } from "@xyflow/react";
import { stratify, tree } from "d3-hierarchy";
import { useCallback, useEffect, useMemo, useRef } from "react";

// Direction types for layout orientation
export type Direction = "TB" | "LR" | "RL" | "BT";

export type AutoLayoutOptions = {
  direction?: Direction;
  nodeWidth?: number;
  nodeHeight?: number;
  fitView?: boolean;
  fitViewPadding?: number;
  animationDuration?: number;
  standaloneSpacing?: number; // Spacing between standalone nodes
  standalonePosition?: "top" | "bottom" | "left" | "right"; // Where to place standalone nodes
};

/**
 * Mapping of direction characters to ReactFlow Position enum values
 */
const positionMap: Record<string, Position> = {
  T: Position.Top,
  L: Position.Left,
  R: Position.Right,
  B: Position.Bottom,
};

/**
 * Transforms coordinates based on the specified direction
 */
const getPosition = (x: number, y: number, direction: Direction): XYPosition => {
  switch (direction) {
    case "LR":
      return { x: y, y: x };
    case "RL":
      return { x: -y, y: x };
    case "BT":
      return { x: x, y: -y };
    default: // TB
      return { x, y };
  }
};

/**
 * Custom hook that provides auto layout functionality for ReactFlow
 */
function useAutoLayout({
  direction = "LR",
  nodeWidth = 220,
  nodeHeight = 100,
  fitView = true,
  fitViewPadding = 0.2,
  animationDuration = 300,
  standaloneSpacing = 50,
  standalonePosition = "bottom",
}: AutoLayoutOptions = {}) {
  const { getNodes, getEdges, setNodes, fitView: reactFlowFitView } = useReactFlow();
  const layoutInProgressRef = useRef(false);
  const layoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastLayoutTimeRef = useRef(0);

  // Calculate node spacing based on direction
  const nodeSize = useMemo<[number, number]>(
    () =>
      direction === "LR" || direction === "RL"
        ? [nodeHeight, nodeWidth] // Swap dimensions for horizontal layout
        : [nodeWidth, nodeHeight], // Use original dimensions for vertical layout
    [direction, nodeHeight, nodeWidth],
  );

  /**
   * Performs the layout calculation and updates node positions
   */
  const calculateLayout = useCallback(() => {
    if (layoutInProgressRef.current) return;

    // Prevent excessive layout calculations (throttle)
    const now = Date.now();
    if (now - lastLayoutTimeRef.current < 300) return;
    lastLayoutTimeRef.current = now;

    layoutInProgressRef.current = true;

    try {
      const allNodes = getNodes();
      const edges = getEdges();

      // Skip if no nodes
      if (allNodes.length === 0) {
        layoutInProgressRef.current = false;
        return;
      }

      // Only use nodes that should be visible
      const visibleNodes = allNodes.filter((node) => !node.hidden && node.data?.visible !== false);

      // Skip if no visible nodes
      if (visibleNodes.length === 0) {
        layoutInProgressRef.current = false;
        return;
      }

      // Find nodes that are involved in any connection (either source or target)
      const connectedNodeIds = new Set<string>();
      edges.forEach((edge) => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);
      });

      // Separate connected and standalone nodes
      const connectedNodes = visibleNodes.filter((node) => connectedNodeIds.has(node.id));
      const standaloneNodes = visibleNodes.filter((node) => !connectedNodeIds.has(node.id));

      // Process connected nodes with tree layout
      if (connectedNodes.length > 0) {
        // Find roots (nodes that have no incoming edges but have outgoing edges)
        const targetsSet = new Set(edges.map((e) => e.target));
        const rootNodes = connectedNodes.filter(
          (node) => !targetsSet.has(node.id) && edges.some((e) => e.source === node.id),
        );

        // If no clear root found, use the first node with an outgoing edge
        const rootNode =
          rootNodes.length > 0
            ? rootNodes[0]
            : connectedNodes.find((node) => edges.some((e) => e.source === node.id)) || connectedNodes[0];

        // Group nodes by their parents and ensure 'add' nodes come last
        const nodesByParent = new Map<string | null, Node[]>();

        connectedNodes.forEach((node) => {
          // Find parent edge (incoming edge)
          const parentEdge = edges.find((e) => e.target === node.id);
          const parentId = parentEdge?.source || null;

          if (!nodesByParent.has(parentId)) {
            nodesByParent.set(parentId, []);
          }

          const siblings = nodesByParent.get(parentId)!;

          // Add nodes to the parent group
          siblings.push(node);
        });

        // Sort each group to ensure 'add' nodes come last
        nodesByParent.forEach((nodes, parentId) => {
          nodes.sort((a, b) => {
            // If a is an 'add' node and b is not, a should come after b
            if (a.type === "add" && b.type !== "add") return 1;
            // If b is an 'add' node and a is not, b should come after a
            if (b.type === "add" && a.type !== "add") return -1;
            // Otherwise maintain original order
            return 0;
          });

          nodesByParent.set(parentId, nodes);
        });

        // Flatten the sorted nodes
        const sortedConnectedNodes: Node[] = [];

        // Start with the root node
        if (nodesByParent.has(null)) {
          sortedConnectedNodes.push(...nodesByParent.get(null)!);
          nodesByParent.delete(null);
        }

        // Process the rest in a breadth-first manner
        const processedParents = new Set<string | null>([null]);
        let currentParents = [rootNode.id];

        while (currentParents.length > 0) {
          const nextParents: string[] = [];

          for (const parentId of currentParents) {
            if (processedParents.has(parentId)) continue;
            processedParents.add(parentId);

            if (nodesByParent.has(parentId)) {
              const children = nodesByParent.get(parentId)!;
              sortedConnectedNodes.push(...children);

              // Add these children as potential parents for next iteration
              nextParents.push(...children.map((n) => n.id));

              nodesByParent.delete(parentId);
            }
          }

          currentParents = nextParents;
        }

        // Add any remaining nodes (should not happen in a well-formed tree)
        for (const [_, remainingNodes] of nodesByParent.entries()) {
          sortedConnectedNodes.push(...remainingNodes);
        }

        // Create a hierarchical structure using d3-hierarchy with our sorted nodes
        const hierarchy = stratify<Node>()
          .id((d) => d.id)
          .parentId((d) => {
            if (d.id === rootNode.id) return null;

            // Find parent edge (incoming edge)
            const parentEdge = edges.find((e) => e.target === d.id);
            return parentEdge?.source || null;
          })(sortedConnectedNodes.length > 0 ? sortedConnectedNodes : connectedNodes);

        // Configure the tree layout
        const layout = tree<Node>()
          .nodeSize(nodeSize)
          .separation((a, b) => {
            // Add more separation for 'add' nodes
            if (a.data.type === "add" || b.data.type === "add") {
              return 1.5;
            }
            return 1;
          });

        // Apply layout to the hierarchy
        const root = layout(hierarchy);

        // Calculate bounds of the tree
        let minX = Infinity,
          maxX = -Infinity,
          minY = Infinity,
          maxY = -Infinity;
        root.each((node) => {
          minX = Math.min(minX, node.x);
          maxX = Math.max(maxX, node.x);
          minY = Math.min(minY, node.y);
          maxY = Math.max(maxY, node.y);
        });

        // Now position the standalone nodes
        let standaloneStartX = 0;
        let standaloneStartY = 0;
        const standaloneWidth = nodeWidth + standaloneSpacing;
        const standaloneHeight = nodeHeight + standaloneSpacing;

        // Position standalone nodes based on tree layout bounds
        switch (standalonePosition) {
          case "bottom":
            standaloneStartX = minX;
            standaloneStartY = maxY + standaloneHeight;
            break;
          case "top":
            standaloneStartX = minX;
            standaloneStartY = minY - standaloneHeight;
            break;
          case "left":
            standaloneStartX = minX - standaloneWidth;
            standaloneStartY = minY;
            break;
          case "right":
            standaloneStartX = maxX + standaloneWidth;
            standaloneStartY = minY;
            break;
        }

        // Store original positions to avoid unnecessary updates
        const originalPositions = new Map(allNodes.map((node) => [node.id, { ...node.position }]));

        // Update node positions based on layout
        setNodes((nds) =>
          nds.map((node) => {
            // Skip hidden nodes
            if (node.hidden || node.data?.visible === false) return node;

            // Skip updating position for nodes being dragged
            if (node.dragging) return node;

            // Set source and target positions based on direction
            const sourcePosition = positionMap[direction[1]];
            const targetPosition = positionMap[direction[0]];

            // Handle connected nodes
            if (connectedNodeIds.has(node.id)) {
              // Find corresponding hierarchy node
              const hierarchyNode = root.find((d) => d.id === node.id);
              if (!hierarchyNode) return node;

              // Transform position based on direction
              const position = getPosition(hierarchyNode.x, hierarchyNode.y, direction);

              // Skip update if position hasn't changed significantly
              const original = originalPositions.get(node.id);
              if (original && Math.abs(original.x - position.x) < 1 && Math.abs(original.y - position.y) < 1) {
                return node;
              }

              return {
                ...node,
                position,
                sourcePosition,
                targetPosition,
              };
            }
            // Handle standalone nodes
            else if (standaloneNodes.includes(node)) {
              const standaloneIndex = standaloneNodes.indexOf(node);
              let standaloneX, standaloneY;

              // Arrange standalone nodes in a grid or line based on standalonePosition
              if (standalonePosition === "top" || standalonePosition === "bottom") {
                standaloneX = standaloneStartX + standaloneIndex * standaloneWidth;
                standaloneY = standaloneStartY;
              } else {
                standaloneX = standaloneStartX;
                standaloneY = standaloneStartY + standaloneIndex * standaloneHeight;
              }

              const position = getPosition(standaloneX, standaloneY, direction);

              return {
                ...node,
                position,
                sourcePosition,
                targetPosition,
              };
            }

            return node;
          }),
        );
      }
      // If there are only standalone nodes, arrange them in a line or grid
      else if (standaloneNodes.length > 0) {
        const nodesPerRow = Math.ceil(Math.sqrt(standaloneNodes.length));
        const standalonePadding = 50;

        setNodes((nds) =>
          nds.map((node, _index) => {
            // Skip hidden nodes
            if (node.hidden || node.data?.visible === false) return node;
            // Skip updating position for nodes being dragged
            if (node.dragging) return node;

            if (standaloneNodes.includes(node)) {
              const standaloneIndex = standaloneNodes.indexOf(node);
              const row = Math.floor(standaloneIndex / nodesPerRow);
              const col = standaloneIndex % nodesPerRow;

              const standaloneX = col * (nodeWidth + standalonePadding);
              const standaloneY = row * (nodeHeight + standalonePadding);

              return {
                ...node,
                position: { x: standaloneX, y: standaloneY },
                sourcePosition: positionMap[direction[1]],
                targetPosition: positionMap[direction[0]],
              };
            }

            return node;
          }),
        );
      }

      // If fitView is enabled, fit the view to show all nodes
      if (fitView) {
        const fitViewTimeout = setTimeout(() => {
          reactFlowFitView({
            padding: fitViewPadding,
            includeHiddenNodes: false,
            duration: animationDuration,
          });
        }, 50);

        return () => clearTimeout(fitViewTimeout);
      }
    } catch (error) {
      console.error("Error during layout calculation:", error);
    } finally {
      // Set a timeout before allowing the next layout
      setTimeout(() => {
        layoutInProgressRef.current = false;
      }, 300);
    }
  }, [
    getNodes,
    getEdges,
    setNodes,
    nodeSize,
    direction,
    fitView,
    reactFlowFitView,
    fitViewPadding,
    animationDuration,
    nodeWidth,
    nodeHeight,
    standaloneSpacing,
    standalonePosition,
  ]);

  /**
   * Triggers layout with debouncing to prevent multiple calculations
   */
  const triggerLayout = useCallback(() => {
    if (layoutTimeoutRef.current) {
      clearTimeout(layoutTimeoutRef.current);
    }

    layoutTimeoutRef.current = setTimeout(() => {
      calculateLayout();
      layoutTimeoutRef.current = null;
    }, 200); // Debounce time
  }, [calculateLayout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (layoutTimeoutRef.current) {
        clearTimeout(layoutTimeoutRef.current);
      }
    };
  }, []);

  return {
    calculateLayout,
    triggerLayout,
  };
}

export default useAutoLayout;
