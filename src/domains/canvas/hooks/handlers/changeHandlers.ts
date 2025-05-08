// src/domains/canvas/hooks/handlers/changeHandlers.ts
import { useCallback } from "react";
import { OnNodesChange, OnEdgesChange, applyNodeChanges, applyEdgeChanges, useReactFlow } from "reactflow";
import { useCanvas } from "../../canvas.context";

export function useChangeHandlers() {
  const { setNodes, setEdges } = useCanvas();
  const reactFlow = useReactFlow();

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

  return {
    onNodesChange,
    onEdgesChange,
    reactFlow,
  };
}
