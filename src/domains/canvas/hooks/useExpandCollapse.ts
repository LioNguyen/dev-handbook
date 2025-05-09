// src/domains/canvas/hooks/useExpandCollapse.ts
import { HierarchyNode, HierarchyPointNode, stratify, tree } from "d3-hierarchy";
import { useMemo } from "react";
import { Edge, Node, Position, XYPosition } from "@xyflow/react";

// Define the ExpandCollapseNode type
export interface ExpandCollapseNode extends Node {
  data: {
    expandable?: boolean;
    expanded?: boolean;
    order?: string;
    value?: string;
    subtext?: string;
    type?: string;
    visible?: boolean;
    [key: string]: any;
  };
}

/**
 * Options for the expand/collapse hook
 */
export type UseExpandCollapseOptions = {
  layoutNodes?: boolean; // Whether to apply the tree layout
  treeWidth?: number; // Width between sibling nodes
  treeHeight?: number; // Height between parent and child nodes
  direction?: "TB" | "LR" | "RL" | "BT"; // Direction of the tree
};

/**
 * Mapping of direction characters to ReactFlow Position enum values
 * T = Top, L = Left, R = Right, B = Bottom
 */
const positionMap: Record<string, Position> = {
  T: Position.Top,
  L: Position.Left,
  R: Position.Right,
  B: Position.Bottom,
};

/**
 * Type guard to check if a hierarchy node has coordinate data
 */
function isHierarchyPointNode(
  pointNode: HierarchyNode<ExpandCollapseNode> | HierarchyPointNode<ExpandCollapseNode>,
): pointNode is HierarchyPointNode<ExpandCollapseNode> {
  return (
    typeof (pointNode as HierarchyPointNode<ExpandCollapseNode>).x === "number" &&
    typeof (pointNode as HierarchyPointNode<ExpandCollapseNode>).y === "number"
  );
}

/**
 * Transforms coordinates based on the specified direction
 */
const getPosition = (x: number, y: number, direction: "TB" | "LR" | "RL" | "BT"): XYPosition => {
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
 * Custom hook that handles tree expansion and collapse with auto layout
 * Uses D3 hierarchy and tree layout to arrange nodes in a tree structure
 *
 * @param nodes All nodes in the tree
 * @param edges All edges connecting the nodes
 * @param options Configuration options for the tree layout
 * @returns Object containing visible nodes and edges based on expand/collapse state
 */
function useExpandCollapseStandalone(
  nodes: Node[],
  edges: Edge[],
  { layoutNodes = true, treeWidth = 220, treeHeight = 100, direction = "LR" }: UseExpandCollapseOptions = {},
): { nodes: Node[]; edges: Edge[] } {
  // Calculate visible nodes and edges based on expand/collapse state
  const { nodes: visibleNodes, edges: visibleEdges } = useMemo(() => {
    if (!nodes.length) {
      return { nodes: [], edges: [] };
    }

    try {
      // Convert ReactFlow nodes to a format compatible with d3-hierarchy
      // FIX: Properly convert node data with explicit typing
      const hierarchyNodes: ExpandCollapseNode[] = nodes.map(
        (node) =>
          ({
            ...node,
            data: {
              ...(node.data || {}),
              // Convert to boolean to avoid type issues
              expandable: Boolean(node.data?.expandable),
              expanded: Boolean(node.data?.expanded),
            },
          } as ExpandCollapseNode),
      );

      // Group nodes by their tree structure
      const nodeGroups = groupNodesByConnectivity(hierarchyNodes, edges);

      // Process each group of connected nodes
      const allVisibleNodes: Node[] = [];
      const allVisibleEdges: Edge[] = [];

      // Process each connected component separately
      nodeGroups.forEach((groupNodes, _index) => {
        // Skip empty groups
        if (groupNodes.length === 0) return;

        // For each group, designate a root node
        const rootNode = groupNodes[0]; // Take first node as root by default

        // Process nodes in this group with a clear root
        const processedNodes = processNodeGroup(
          rootNode,
          groupNodes,
          edges,
          layoutNodes,
          treeWidth,
          treeHeight,
          direction,
        );

        // Add to overall result
        if (processedNodes.nodes.length > 0) {
          allVisibleNodes.push(...processedNodes.nodes);
          allVisibleEdges.push(...processedNodes.edges);
        }
      });

      return {
        nodes: allVisibleNodes,
        edges: allVisibleEdges,
      };
    } catch (error) {
      console.error("Error during hierarchy calculation:", error);
      return { nodes: [], edges: [] };
    }
  }, [nodes, edges, layoutNodes, treeWidth, treeHeight, direction]);

  return { nodes: visibleNodes, edges: visibleEdges };
}

/**
 * Group nodes by their connectivity (connected components)
 * This helps handle multiple disconnected trees/nodes
 */
function groupNodesByConnectivity(nodes: ExpandCollapseNode[], edges: Edge[]): ExpandCollapseNode[][] {
  // Create a map of node id to its group
  const nodeToGroup = new Map<string, number>();
  // Create groups of connected nodes
  const groups: ExpandCollapseNode[][] = [];

  // First, identify standalone nodes (no incoming or outgoing edges)
  const connectedNodeIds = new Set<string>();
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  // Put each standalone node in its own group
  nodes.forEach((node) => {
    if (!connectedNodeIds.has(node.id)) {
      const groupIndex = groups.length;
      groups.push([node]);
      nodeToGroup.set(node.id, groupIndex);
    }
  });

  // For connected nodes, build a graph and run a breadth-first search
  // to find connected components
  const connectedNodes = nodes.filter((node) => connectedNodeIds.has(node.id));

  // Build adjacency list
  const adjacencyList = new Map<string, string[]>();
  connectedNodes.forEach((node) => {
    adjacencyList.set(node.id, []);
  });

  edges.forEach((edge) => {
    // Add bidirectional connection to represent the component
    if (adjacencyList.has(edge.source)) {
      adjacencyList.get(edge.source)!.push(edge.target);
    }
    if (adjacencyList.has(edge.target)) {
      adjacencyList.get(edge.target)!.push(edge.source);
    }
  });

  // BFS to find connected components
  const visited = new Set<string>();

  connectedNodes.forEach((node) => {
    if (!visited.has(node.id)) {
      // Start a new connected component
      const groupIndex = groups.length;
      const component: ExpandCollapseNode[] = [];

      // BFS
      const queue = [node.id];
      visited.add(node.id);

      while (queue.length > 0) {
        const currentId = queue.shift()!;
        const currentNode = connectedNodes.find((n) => n.id === currentId);

        if (currentNode) {
          component.push(currentNode);
          nodeToGroup.set(currentId, groupIndex);
        }

        // Add neighbors to queue
        const neighbors = adjacencyList.get(currentId) || [];
        neighbors.forEach((neighborId) => {
          if (!visited.has(neighborId)) {
            visited.add(neighborId);
            queue.push(neighborId);
          }
        });
      }

      groups.push(component);
    }
  });

  return groups;
}

/**
 * Process a group of connected nodes as a tree
 */
function processNodeGroup(
  rootNode: ExpandCollapseNode,
  groupNodes: ExpandCollapseNode[],
  edges: Edge[],
  layoutNodes: boolean,
  treeWidth: number,
  treeHeight: number,
  direction: "TB" | "LR" | "RL" | "BT",
): { nodes: Node[]; edges: Edge[] } {
  try {
    // Find edges that belong to this group
    const groupNodeIds = new Set(groupNodes.map((node) => node.id));
    const groupEdges = edges.filter((edge) => groupNodeIds.has(edge.source) && groupNodeIds.has(edge.target));

    // For standalone nodes with no edges, just return them with their original positions
    if (groupEdges.length === 0) {
      return {
        nodes: groupNodes,
        edges: [],
      };
    }

    // Find the best root node - prefer nodes with no incoming edges
    let bestRoot = rootNode;
    const nodesWithIncomingEdges = new Set<string>();

    groupEdges.forEach((edge) => {
      nodesWithIncomingEdges.add(edge.target);
    });

    // Find a node with no incoming edges
    const potentialRoots = groupNodes.filter((node) => !nodesWithIncomingEdges.has(node.id));
    if (potentialRoots.length > 0) {
      bestRoot = potentialRoots[0];
    }

    // Create a modified version of nodes where the chosen root has null parentId
    const nodesWithRoot = groupNodes.map((node) => ({
      ...node,
      // If this is our designated root, ensure it has null parentId
      __forcedParentId: node.id === bestRoot.id ? null : undefined,
    }));

    // Create a hierarchical structure from flat nodes and edges
    const hierarchy = stratify<ExpandCollapseNode & { __forcedParentId?: string | null }>()
      .id((d) => d.id)
      .parentId((d) => {
        // If we forced a null parentId, use that
        if (d.__forcedParentId === null) return null;

        // Otherwise find the parent edge
        const parentEdge = groupEdges.find((e) => e.target === d.id);
        return parentEdge?.source || null;
      })(nodesWithRoot);

    // Process nodes to determine which are expandable and which should be collapsed
    hierarchy.descendants().forEach((d) => {
      // Mark nodes as expandable if they have children
      const hasChildren = !!d.children?.length;

      // Ensure data object exists
      if (!d.data.data) {
        d.data.data = {};
      }

      d.data.data.expandable = hasChildren;

      if (hasChildren) {
        // If node is not expanded, hide its children
        d.children = d.data.data.expanded ? d.children : undefined;
      }
    });

    // Configure layout based on direction
    const nodeSize: [number, number] =
      direction === "LR" || direction === "RL"
        ? [treeHeight, treeWidth] // Swap dimensions for horizontal layout
        : [treeWidth, treeHeight]; // Use original dimensions for vertical layout

    // Create a tree layout using D3
    const layout = tree<ExpandCollapseNode>()
      .nodeSize(nodeSize)
      .separation(() => 1);

    // Apply layout if enabled
    const root = layoutNodes ? layout(hierarchy) : hierarchy;

    // Extract visible nodes and edges from the hierarchy
    const visibleNodes = root.descendants().map((d) => {
      let position: XYPosition;

      if (isHierarchyPointNode(d)) {
        // Transform position based on direction
        position = getPosition(d.x, d.y, direction);
      } else {
        position = d.data.position;
      }

      // Set source and target positions based on direction
      const sourcePosition = positionMap[direction[1]];
      const targetPosition = positionMap[direction[0]];

      return {
        ...d.data,
        // Create a new reference for the data object to trigger React renders
        data: { ...d.data.data },
        // Use existing type or default based on role
        type: d.data.type || (d.data.id === bestRoot.id ? "root" : "custom"),
        position,
        sourcePosition,
        targetPosition,
        style: { ...(d.data.style || {}), opacity: 1 },
      };
    });

    // Only keep edges between visible nodes
    const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
    const visibleEdges = groupEdges
      .filter((edge) => {
        const isVisible = visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target);
        return isVisible;
      })
      .map((edge) => ({
        ...edge,
        style: { ...(edge.style || {}), opacity: 1 },
      }));

    return {
      nodes: visibleNodes,
      edges: visibleEdges,
    };
  } catch (error) {
    console.error("Error processing node group:", error);
    // Return the original nodes without processing as a fallback
    return {
      nodes: groupNodes,
      edges: edges.filter(
        (edge) => groupNodes.some((n) => n.id === edge.source) && groupNodes.some((n) => n.id === edge.target),
      ),
    };
  }
}

export default useExpandCollapseStandalone;
