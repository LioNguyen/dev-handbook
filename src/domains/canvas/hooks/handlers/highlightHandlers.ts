// src/domains/canvas/hooks/handlers/highlightHandlers.ts
import { useCallback } from "react";
import { useCanvas } from "../../canvas.context";

export function useHighlightHandlers() {
  const { edges, setHighlightedNodeId, setHighlightedEdges, setHighlightedNodes } = useCanvas();

  /**
   * Function to get all descendants of a node
   */
  const getNodeDescendants = useCallback(
    (nodeId: string) => {
      const descendants = new Set<string>();
      const edgesToHighlight = new Set<string>();

      // Recursive function to find all children
      const findChildren = (id: string) => {
        // Add this node to the set
        descendants.add(id);

        // Find all direct children
        edges.forEach((edge) => {
          if (edge.source === id) {
            // This is a connection from our node to a child
            edgesToHighlight.add(edge.id);
            descendants.add(edge.target);
            // Recursively find children of this child
            findChildren(edge.target);
          }
        });
      };

      findChildren(nodeId);
      return { descendants, edgesToHighlight };
    },
    [edges],
  );

  /**
   * Function to highlight a node and its children
   */
  const highlightNodes = useCallback(
    (nodeId: string) => {
      if (!nodeId) {
        // Clear highlighting
        setHighlightedNodeId(null);
        setHighlightedEdges(new Set());
        setHighlightedNodes(new Set());
        return;
      }

      // Get all descendants and related edges
      const { descendants, edgesToHighlight } = getNodeDescendants(nodeId);

      // Update state
      setHighlightedNodeId(nodeId);
      setHighlightedNodes(descendants);
      setHighlightedEdges(edgesToHighlight);
    },
    [getNodeDescendants, setHighlightedNodeId, setHighlightedEdges, setHighlightedNodes],
  );

  /**
   * Handler for canvas click to clear highlighting
   */
  const onPaneClick = useCallback(() => {
    highlightNodes("");
  }, [highlightNodes]);

  return {
    getNodeDescendants,
    highlightNodes,
    onPaneClick,
  };
}
