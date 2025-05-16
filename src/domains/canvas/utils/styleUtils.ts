import { Edge, Node } from "@xyflow/react";

import { cn } from "@/shared/utils";
import { CSSProperties } from "react";

/**
 * Applies styling to nodes based on their selection state and relationships
 * Returns styled nodes ready to be rendered
 */
export function applyNodesStyles(nodes: Node[], _edges: Edge[], style?: CSSProperties): Node[] {
  // Return nodes with applied styles
  return nodes.map((node) => {
    const nodeState: any = node.data?.state || {};
    const isParentSelected = nodeState?.isParentSelected || node?.selected;
    const isChildSelected = nodeState?.isChildSelected;

    if (node.type === "root" || node.type === "add") {
      return { ...node };
    }

    return {
      ...node,
      className: cn(node.className, node.data?.isDropTarget ? "drop-target" : "", node.dragging ? "dragging" : ""),
      style: style || {
        ...node.style,
        borderRadius: "9999px",
        outlineOffset: 1,
        outline: isChildSelected
          ? "2px solid rgb(244 63 94 / 0.8)"
          : isParentSelected
          ? "4px solid rgb(244 63 94 / 0.8)"
          : "",
      },
    };
  });
}

/**
 * Applies styling to edges based on their relationship to selected nodes
 * Returns styled edges ready to be rendered
 */
export function applyEdgesStyles(_nodes: Node[], edges: Edge[]): Edge[] {
  // Return edges with applied styles
  return edges.map((edge) => {
    const edgeState: any = { ...(edge.data?.state || {}) };
    const isSelected = edgeState?.isSelected || edge?.selected;

    return {
      ...edge,
      animated: isSelected,
      style: {
        ...edge.style,
        stroke: isSelected ? "rgba(244,63,94,0.8)" : "",
        strokeWidth: isSelected ? 4 : 1,
      },
    };
  });
}
