// src/domains/canvas/hooks/handlers/changeHandlers.ts
import { useCallback } from "react";
import { OnEdgesChange, OnNodesChange, applyEdgeChanges, applyNodeChanges, useReactFlow } from "reactflow";
import { useCanvas } from "../../canvas.context";

export function useChangeHandlers() {
  const { setNodes, setEdges } = useCanvas();
  const reactFlow = useReactFlow();

  /**
   * Handles changes to nodes (position, selection, etc.)
   */
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      // First, process changes to handle dragging explicitly
      changes.forEach((change) => {
        if (change.type === "position" && "dragging" in change) {
          // Update the isDragging property in node data
          setNodes((nodes) =>
            nodes.map((node) => {
              if (node.id === change.id) {
                return {
                  ...node,
                  dragging: change.dragging,
                  data: {
                    ...node.data,
                    isDragging: change.dragging,
                  },
                };
              }
              return node;
            }),
          );
        }
      });

      // Then apply all the changes to update positions etc.
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
