// src/domains/canvas/hooks/handlers/nodeHandlers/useNodeDragHandlers.ts
import { Node } from "@xyflow/react";
import { useCallback } from "react";
import { usePreviewCanvas } from "../../PreviewCanvas.context";
import { useNodeParentChange } from "./useNodeParentChange";

export function useNodeDragHandlers() {
  const { setNodes } = usePreviewCanvas();
  const changeNodeParent = useNodeParentChange();

  /**
   * Handle node drag start
   */
  const handleNodeDragStart = useCallback((event: React.MouseEvent, node: Node) => {
    event.stopPropagation();

    if (node.type === "add" || node.type === "root") return;
  }, []);

  /**
   * Handle node drag
   */
  const handleNodeDrag = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();

      if (node.type === "add" || node.type === "root") return;

      // Get elements at the mouse position
      const elementsAtPoint = document.elementsFromPoint(event.clientX, event.clientY);

      // Find potential drop targets
      let dropTargetId: string | null = null;

      for (const element of elementsAtPoint) {
        if (element.classList.contains("react-flow__node") && element instanceof HTMLElement) {
          const targetId = element.getAttribute("data-id");
          if (targetId && targetId !== node.id) {
            dropTargetId = targetId;
            break;
          }
        }
      }

      // Update drop target states
      setNodes((nodes) =>
        nodes.map((n) => {
          if (dropTargetId && n.id === dropTargetId) {
            return {
              ...n,
              data: {
                ...n.data,
                isDropTarget: true,
              },
            };
          } else if (n.data?.isDropTarget) {
            return {
              ...n,
              data: {
                ...n.data,
                isDropTarget: false,
              },
            };
          }
          return n;
        }),
      );

      // Save potential drop target on the dragging node
      setNodes((nodes) =>
        nodes.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                dropTargetId,
              },
            };
          }
          return n;
        }),
      );
    },
    [setNodes],
  );

  /**
   * Handle node drag stop
   */
  const handleNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();

      if (node.type === "add" || node.type === "root") return;

      // Get the potential drop target
      const dropTargetId = node.data?.dropTargetId;

      // If we have a drop target, change the parent
      if (dropTargetId && dropTargetId !== node.id) {
        console.log(`Changing parent: ${node.id} -> ${dropTargetId}`);
        // Fix: Ensure dropTargetId is a string
        changeNodeParent(node.id, String(dropTargetId));
      }

      // Reset all drag-related states
      setNodes((nodes) =>
        nodes.map((n) => ({
          ...n,
          data: {
            ...n.data,
            isDropTarget: false,
            dropTargetId: null,
          },
        })),
      );
    },
    [changeNodeParent, setNodes],
  );

  return {
    handleNodeDragStart,
    handleNodeDrag,
    handleNodeDragStop,
  };
}
