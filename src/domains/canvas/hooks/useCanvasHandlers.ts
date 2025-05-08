// src/domains/canvas/hooks/useCanvasHandlers.ts
import { useCallback } from "react";
import { OnNodesChange, OnEdgesChange, applyNodeChanges, applyEdgeChanges } from "reactflow";
import { useCanvas } from "../canvas.context";

export function useCanvasHandlers() {
  const { setNodes, setEdges, highlightNodes } = useCanvas();

  /**
   * Handles changes to nodes (position, selection, etc.)
   */
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes],
  );

  /**
   * Handles changes to edges
   */
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );

  /**
   * Toggles expansion state for a specific node by ID
   */
  const toggleNodeExpansion = useCallback(
    (nodeId: string) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === nodeId && n.data.expandable) {
            // Toggle the expanded state of the node
            const newExpandState = !n.data.expanded;

            return {
              ...n,
              data: { ...n.data, expanded: newExpandState },
            };
          }
          return n;
        }),
      );
    },
    [setNodes],
  );

  /**
   * Marks a node as expandable
   */
  const markNodeAsExpandable = useCallback(
    (nodeId: string) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === nodeId && !n.data.expandable) {
            return {
              ...n,
              data: { ...n.data, expandable: true },
            };
          }
          return n;
        }),
      );
    },
    [setNodes],
  );

  /**
   * Handler for canvas click to clear highlighting
   */
  const onPaneClick = useCallback(() => {
    highlightNodes("");
  }, [highlightNodes]);

  return {
    onNodesChange,
    onEdgesChange,
    toggleNodeExpansion,
    markNodeAsExpandable,
    onPaneClick,
  };
}
