import { useCallback } from "react";
import { OnEdgesChange, OnNodesChange, applyEdgeChanges, applyNodeChanges, useReactFlow } from "@xyflow/react";
import { usePreviewCanvas } from "../../PreviewCanvas.context";

export function useChangeHandlers() {
  const { setNodes, setEdges } = usePreviewCanvas();

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
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );

  return {
    onNodesChange,
    onEdgesChange,
  };
}
