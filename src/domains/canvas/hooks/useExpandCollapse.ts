// src/domains/canvas/hooks/useExpandCollapseStandalone.ts
import { HierarchyNode, HierarchyPointNode, stratify, tree } from "d3-hierarchy";
import { useMemo } from "react";
import { Edge, Node, Position } from "reactflow";

// Define the ExpandCollapseNode type
export interface ExpandCollapseNode extends Node {
  data: {
    expandable?: boolean;
    expanded?: boolean;
    order?: string;
    value?: string;
    subtext?: string;
    type?: string;
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
const getPosition = (x: number, y: number, direction: "TB" | "LR" | "RL" | "BT") => {
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
      const hierarchyNodes: ExpandCollapseNode[] = nodes.map((node) => ({
        ...node,
        data: {
          ...(node.data || {}),
          expandable: node.data?.expandable ?? false,
          expanded: node.data?.expanded ?? false,
        },
      }));

      // Create a hierarchical structure from flat nodes and edges
      const hierarchy = stratify<ExpandCollapseNode>()
        .id((d) => d.id)
        .parentId((d) => {
          // Find the parent edge
          const parentEdge = edges.find((e) => e.target === d.id);
          return parentEdge?.source || null;
        })(hierarchyNodes);

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
        let position;

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
          type: d.data.id === "1" ? "root" : "custom", // Set root node type
          position,
          sourcePosition,
          targetPosition,
          style: { ...(d.data.style || {}), opacity: 1 },
        };
      });

      // Only keep edges between visible nodes
      const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
      const visibleEdges = edges
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
      console.error("Error during hierarchy calculation:", error);
      return { nodes: [], edges: [] };
    }
  }, [nodes, edges, layoutNodes, treeWidth, treeHeight, direction]);

  return { nodes: visibleNodes, edges: visibleEdges };
}

export default useExpandCollapseStandalone;
