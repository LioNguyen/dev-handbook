import { useMemo } from "react";
import { Node, Edge, XYPosition } from "reactflow";
import {
  HierarchyNode,
  HierarchyPointNode,
  stratify,
  tree,
} from "d3-hierarchy";
import { ExpandCollapseNode } from "./types";

/**
 * Options for the expand/collapse hook
 */
export type UseExpandCollapseOptions = {
  layoutNodes?: boolean; // Whether to apply the tree layout
  treeWidth?: number; // Width between sibling nodes
  treeHeight?: number; // Height between parent and child nodes
};

/**
 * Type guard to check if a hierarchy node has coordinate data
 */
function isHierarchyPointNode(
  pointNode:
    | HierarchyNode<ExpandCollapseNode>
    | HierarchyPointNode<ExpandCollapseNode>
): pointNode is HierarchyPointNode<ExpandCollapseNode> {
  return (
    typeof (pointNode as HierarchyPointNode<ExpandCollapseNode>).x ===
      "number" &&
    typeof (pointNode as HierarchyPointNode<ExpandCollapseNode>).y === "number"
  );
}

/**
 * Custom hook that handles tree expansion and collapse
 * Uses D3 hierarchy and tree layout to arrange nodes in a tree structure
 *
 * @param nodes All nodes in the tree
 * @param edges All edges connecting the nodes
 * @param options Configuration options for the tree layout
 * @returns Object containing visible nodes and edges based on expand/collapse state
 */
function useExpandCollapse(
  nodes: Node[],
  edges: Edge[],
  {
    layoutNodes = true,
    treeWidth = 220,
    treeHeight = 100,
  }: UseExpandCollapseOptions = {}
): { nodes: Node[]; edges: Edge[] } {
  return useMemo(() => {
    console.log("Calculating tree layout with", {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      treeWidth,
      treeHeight,
    });

    // Create a hierarchical structure from flat nodes and edges
    const hierarchy = stratify<ExpandCollapseNode>()
      .id((d) => d.id)
      .parentId((d: Node) => {
        const parentEdge = edges.find((e: Edge) => e.target === d.id);
        const parentId = parentEdge?.source;
        if (parentId) {
          console.log(`Node ${d.id} has parent: ${parentId}`);
        } else {
          console.log(`Node ${d.id} is root (no parent)`);
        }
        return parentId;
      })(nodes);

    console.log("Hierarchy created, processing expand/collapse states");

    // Process nodes to determine which are expandable and which should be collapsed
    hierarchy.descendants().forEach((d) => {
      // Mark nodes as expandable if they have children
      const hasChildren = !!d.children?.length;
      d.data.data.expandable = hasChildren;

      if (hasChildren) {
        console.log(
          `Node ${d.data.id} has ${d.children?.length} children, expanded: ${d.data.data.expanded}`
        );

        // If node is not expanded, hide its children
        d.children = d.data.data.expanded ? d.children : undefined;
      }
    });

    // Create a tree layout using D3
    const layout = tree<ExpandCollapseNode>()
      .nodeSize([treeWidth, treeHeight])
      .separation(() => 1);

    // Apply layout if enabled
    const root = layoutNodes ? layout(hierarchy) : hierarchy;
    console.log("Tree layout applied");

    // Extract visible nodes and edges from the hierarchy
    const visibleNodes = root.descendants().map((d) => {
      const position = isHierarchyPointNode(d)
        ? { x: d.x, y: d.y }
        : d.data.position;

      console.log(
        `Node ${d.data.id} positioned at (${position.x}, ${position.y})`
      );

      return {
        ...d.data,
        // Create a new reference for the data object to trigger React renders
        data: { ...d.data.data },
        type: "custom",
        position,
      };
    });

    // Only keep edges between visible nodes
    const visibleEdges = edges.filter((edge) => {
      const sourceExists = !!root.find((h) => h.id === edge.source);
      const targetExists = !!root.find((h) => h.id === edge.target);
      const isVisible = sourceExists && targetExists;

      if (isVisible) {
        console.log(
          `Edge ${edge.id} (${edge.source} → ${edge.target}) is visible`
        );
      } else {
        console.log(
          `Edge ${edge.id} (${edge.source} → ${edge.target}) is hidden`
        );
      }

      return isVisible;
    });

    console.log(
      `Tree calculation complete: ${visibleNodes.length} nodes and ${visibleEdges.length} edges visible`
    );

    return {
      nodes: visibleNodes,
      edges: visibleEdges,
    };
  }, [nodes, edges, layoutNodes, treeWidth, treeHeight]);
}

export default useExpandCollapse;
