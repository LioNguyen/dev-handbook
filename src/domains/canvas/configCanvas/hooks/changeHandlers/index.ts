import { OnEdgesChange, OnNodesChange, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { useCallback } from "react";

import { useConfigCanvas } from "../../ConfigCanvas.context";

export function useChangeHandlers() {
  const { setNodes, setEdges } = useConfigCanvas();

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
                  data: {
                    ...node.data,
                  },
                };
              }
              return node;
            }),
          );
        }
      });

      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes],
  );

  /**
   * Handles changes to edges
   */
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      const safeChanges = changes.filter((change) => !!change.type);

      // Only proceed with changes if there are any left
      if (safeChanges.length > 0) {
        setEdges((eds) => applyEdgeChanges(safeChanges, eds));
      }
    },
    [setEdges],
  );

  return {
    onNodesChange,
    onEdgesChange,
  };
}
