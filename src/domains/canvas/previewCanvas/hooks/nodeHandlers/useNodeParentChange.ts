import { Edge } from "@xyflow/react";
import { useCallback } from "react";

import { usePreviewCanvas } from "../../PreviewCanvas.context";

export function useNodeParentChange() {
  const { edges, setNodes, setEdges, triggerLayout } = usePreviewCanvas();

  /**
   * Changes the parent of a node
   * This is used when a node is dragged onto another node
   */
  const changeNodeParent = useCallback(
    (nodeId: string, newParentId: string) => {
      // First check if this would create a circular reference
      // (A node can't be the parent of one of its ancestors)
      const wouldCreateCircular = (targetId: string, potentialChildId: string): boolean => {
        if (targetId === potentialChildId) return true;

        // Check if the potential child is already a parent (or grandparent, etc.) of the target
        const childEdges = edges.filter((e) => e.target === targetId);
        for (const edge of childEdges) {
          if (wouldCreateCircular(edge.source, potentialChildId)) {
            return true;
          }
        }

        return false;
      };

      // Don't allow circular references
      if (wouldCreateCircular(newParentId, nodeId)) {
        console.warn("Cannot create circular parent-child relationship");
        return false;
      }

      // If the node is already a child of the new parent, do nothing
      const existingEdge = edges.find((e) => e.source === newParentId && e.target === nodeId);
      if (existingEdge) {
        return false;
      }

      // Get the current parent if any
      const currentParentEdge = edges.find((e) => e.target === nodeId);
      const currentParentId = currentParentEdge?.source;

      // Remove the edge from the current parent if exists
      if (currentParentId) {
        setEdges((edges) => edges.filter((e) => !(e.source === currentParentId && e.target === nodeId)));
      }

      // Create a new edge to the new parent
      const newEdge: Edge = {
        id: `${newParentId}->${nodeId}`,
        source: newParentId,
        target: nodeId,
      };

      setEdges((edges) => [...edges, newEdge]);

      // Update the node order based on the new parent
      let childrenCount = 0;
      let parentOrder = "";

      // Get the new parent order and count existing children
      setNodes((currentNodes) => {
        const parentNode = currentNodes.find((n) => n.id === newParentId);
        parentOrder = parentNode?.data?.order ? String(parentNode.data.order) : "";

        // Count children of the new parent
        childrenCount = currentNodes.filter((n) => {
          const edge = edges.find((e) => e.source === newParentId && e.target === n.id);
          return edge !== undefined && n.id !== nodeId;
        }).length;

        return currentNodes;
      });

      // Set the new order for the node
      const newOrder = parentOrder ? `${parentOrder}.${childrenCount + 1}` : `${childrenCount + 1}`;

      // Update the node
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                order: newOrder,
              },
            };
          }
          return node;
        }),
      );

      // Ensure the layout updates properly
      triggerLayout();

      return true;
    },
    [edges, setNodes, setEdges, triggerLayout],
  );

  return changeNodeParent;
}
