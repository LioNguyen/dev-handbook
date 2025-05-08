// src/domains/canvas/hooks/handlers/interactionHandlers.ts
import { useCallback } from "react";
import { Node } from "reactflow";
import { useCanvas } from "../../canvas.context";
import { useNodeHandlers } from "./nodeHandlers";

export function useInteractionHandlers() {
  const { setNodes } = useCanvas();
  const { changeNodeParent } = useNodeHandlers();

  /**
   * Handle node drag start
   */
  const handleNodeDragStart = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      console.log("Drag start:", node.id);

      // Set isDragging flag in node data
      setNodes((nodes) =>
        nodes.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                isDragging: true,
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
   * Handle node drag
   */
  const handleNodeDrag = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Get elements at the mouse position
      const elementsAtPoint = document.elementsFromPoint(event.clientX, event.clientY);

      // Find potential drop targets
      let dropTargetId = null;

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
    (_event: React.MouseEvent, node: Node) => {
      console.log("Drag stop:", node.id);

      // Get the potential drop target
      const dropTargetId = node.data?.dropTargetId;

      // If we have a drop target, change the parent
      if (dropTargetId && dropTargetId !== node.id) {
        console.log(`Changing parent: ${node.id} -> ${dropTargetId}`);
        changeNodeParent(node.id, dropTargetId);
      }

      // Reset all drag-related states
      setNodes((nodes) =>
        nodes.map((n) => ({
          ...n,
          data: {
            ...n.data,
            isDragging: false,
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
