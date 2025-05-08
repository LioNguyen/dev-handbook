// src/domains/canvas/hooks/handlers/edgeHandlers.ts
import { useCallback } from "react";
import { Edge } from "reactflow";
import { useCanvas } from "../../canvas.context";

export function useEdgeHandlers() {
  const { setEdges } = useCanvas();

  /**
   * Adds a new edge between nodes
   */
  const addEdge = useCallback(
    (edgeData: Partial<Edge>) => {
      setEdges((edges) => [...edges, edgeData as Edge]);
    },
    [setEdges],
  );

  /**
   * Deletes an edge
   */
  const deleteEdge = useCallback(
    (edgeId: string) => {
      setEdges((edges) => edges.filter((edge) => edge.id !== edgeId));
    },
    [setEdges],
  );

  return {
    addEdge,
    deleteEdge,
  };
}
