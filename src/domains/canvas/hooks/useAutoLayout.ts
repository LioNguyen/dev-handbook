// src/domains/canvas/hooks/useAutoLayout.ts
import { Edge, Node, useReactFlow } from "@xyflow/react";
import { stratify, tree } from "d3-hierarchy";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { Direction, findRootNode, getPosition, positionMap, separateNodes } from "@domains/canvas/utils";

export type AutoLayoutOptions = {
  direction?: Direction;
  nodeWidth?: number;
  nodeHeight?: number;
  fitView?: boolean;
  fitViewPadding?: number;
  animationDuration?: number;
};

/**
 * Groups and sorts nodes by parent relationships
 */
const organizeNodesByParent = (connectedNodes: Node[], edges: Edge[]) => {
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

  return nodesByParent;
};

/**
 * Creates a flattened, sorted list of nodes based on parent-child relationships
 */
const createSortedNodeList = (rootNode: Node, nodesByParent: Map<string | null, Node[]>) => {
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

  return sortedConnectedNodes;
};

/**
 * Custom hook that provides auto layout functionality using the ReactFlow context
 */
function useAutoLayout({
  direction = "LR",
  nodeWidth = 400,
  nodeHeight = 100,
  fitViewPadding = 0.2,
  animationDuration = 300,
  fitView = true,
}: AutoLayoutOptions = {}) {
  // Use the ReactFlow hook to access the instance
  const reactFlowInstance = useReactFlow();

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
   * Arranges standalone nodes in a grid layout
   */
  const layoutStandaloneNodes = useCallback(
    (standaloneNodes: Node[], direction: Direction, nodeWidth: number, nodeHeight: number) => {
      const nodesPerRow = Math.ceil(Math.sqrt(standaloneNodes.length));
      const standalonePadding = 50;

      return standaloneNodes.map((node, index) => {
        const row = Math.floor(index / nodesPerRow);
        const col = index % nodesPerRow;

        const standaloneX = col * (nodeWidth + standalonePadding);
        const standaloneY = row * (nodeHeight + standalonePadding);

        return {
          ...node,
          position: { x: standaloneX, y: standaloneY },
          sourcePosition: positionMap[direction[1]],
          targetPosition: positionMap[direction[0]],
        };
      });
    },
    [],
  );

  /**
   * Performs the layout calculation and updates node positions
   */
  const calculateLayout = useCallback(() => {
    if (!reactFlowInstance || layoutInProgressRef.current) return;

    // Prevent excessive layout calculations (throttle)
    const now = Date.now();
    if (now - lastLayoutTimeRef.current < 300) return;
    lastLayoutTimeRef.current = now;

    layoutInProgressRef.current = true;

    try {
      const allNodes = reactFlowInstance.getNodes();
      const edges = reactFlowInstance.getEdges();

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

      // Separate connected and standalone nodes
      const { connectedNodes, standaloneNodes, connectedNodeIds } = separateNodes(visibleNodes, edges);

      // Process connected nodes with tree layout
      if (connectedNodes.length > 0) {
        // Find the root node for our tree
        const rootNode = findRootNode(connectedNodes, edges);

        // Group nodes by their parents and ensure 'add' nodes come last
        const nodesByParent = organizeNodesByParent(connectedNodes, edges);

        // Create a flattened, sorted list of nodes
        const sortedConnectedNodes = createSortedNodeList(rootNode, nodesByParent);

        // Create a hierarchical structure using d3-hierarchy
        const hierarchy = stratify<Node>()
          .id((d) => d.id)
          .parentId((d) => {
            if (d.id === rootNode.id) return null;
            const parentEdge = edges.find((e) => e.target === d.id);
            return parentEdge?.source || null;
          })(sortedConnectedNodes.length > 0 ? sortedConnectedNodes : connectedNodes);

        // Configure the tree layout
        const layout = tree<Node>()
          .nodeSize(nodeSize)
          .separation((a, b) => {
            // Add more separation for 'add' nodes
            if (a.data.type === "add" || b.data.type === "add") {
              return 1;
            }
            return 1;
          });

        // Apply layout to the hierarchy
        const root = layout(hierarchy);

        // Store original positions to avoid unnecessary updates
        const originalPositions = new Map(allNodes.map((node) => [node.id, { ...node.position }]));

        // Update node positions based on layout
        reactFlowInstance.setNodes((nds) =>
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

            return node;
          }),
        );
      }
      // If there are only standalone nodes, arrange them in a grid
      else if (standaloneNodes.length > 0) {
        const layoutedStandaloneNodes = layoutStandaloneNodes(standaloneNodes, direction, nodeWidth, nodeHeight);

        reactFlowInstance.setNodes((nds) =>
          nds.map((node) => {
            // Skip hidden nodes or nodes being dragged
            if (node.hidden || node.data?.visible === false || node.dragging) return node;

            // Find the layouted standalone node
            const layoutedNode = layoutedStandaloneNodes.find((n) => n.id === node.id);
            if (layoutedNode) return layoutedNode;

            return node;
          }),
        );
      }

      // If fitView is enabled, fit the view to show all nodes
      if (fitView) {
        const fitViewTimeout = setTimeout(() => {
          reactFlowInstance.fitView({
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
    reactFlowInstance,
    nodeSize,
    direction,
    fitView,
    fitViewPadding,
    animationDuration,
    nodeWidth,
    nodeHeight,
    layoutStandaloneNodes,
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
