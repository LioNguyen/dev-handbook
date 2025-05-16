// src/domains/canvas/hooks/handlers/nodeHandlers/useToggleAddNode.ts
import useAutoLayout from "@/domains/canvas/hooks/useAutoLayout";
import { Position, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useNodeCreate } from "./useNodeCreate";
import { useNodesDelete } from "./useNodesDelete";

export function useToggleAddNode() {
  const { getNodes } = useReactFlow();
  const { triggerLayout } = useAutoLayout();
  const createNode = useNodeCreate();
  const deleteNodes = useNodesDelete();

  /**
   * Toggles an 'add' node when a custom node is selected/deselected
   */
  const toggleAddNode = useCallback(
    (parentId: string, isSelected: boolean) => {
      const addNodeId = `add-${parentId}`;

      // If already toggled and we're toggling again, remove existing add node
      const existingAddNode = getNodes().find((node) => node.id === addNodeId);

      if (existingAddNode) {
        deleteNodes([addNodeId]);

        // If we want to select it again, we need to wait for delete to complete
        if (isSelected) {
          setTimeout(() => createAddNode(), 50);
        }

        triggerLayout();
        return;
      }

      // If no existing node and we want to select, create new add node
      if (isSelected) {
        createAddNode();
      }

      // Function to create the add node using the new createNode function
      function createAddNode() {
        const parentNode = getNodes().find((node) => node.id === parentId);
        if (!parentNode) return;

        const parentPosition = { x: parentNode.position.x, y: parentNode.position.y };

        // Call createNode with appropriate options
        createNode({
          parent: {
            id: parentId,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          },
          data: {
            parentId,
            parentPosition,
            label: "+ Add Child",
            value: "+ Add",
            subtext: "NEW NODE",
            type: "add",
            // Override the automatic ID generation to use our specific format
            _overrideId: addNodeId,
          },
          nodeType: "add", // Use the add node type
        });
      }
    },
    [getNodes, createNode, triggerLayout],
  );

  return toggleAddNode;
}
