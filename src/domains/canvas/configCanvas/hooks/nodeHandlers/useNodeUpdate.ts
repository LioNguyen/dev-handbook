// src/domains/canvas/hooks/handlers/nodeHandlers/useNodeUpdate.ts
import { Node, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

import useConfigCanvasAutoLayout from "../useConfigCanvasAutoLayout";

/**
 * Custom hook for updating node properties with proper type safety and optimizations
 */
export function useNodeUpdate() {
  const { getNodes, setNodes } = useReactFlow();
  const { triggerLayout } = useConfigCanvasAutoLayout();

  /**
   * Updates an existing node with new data while preserving other properties
   */
  const updateNode = useCallback(
    (options: {
      nodeId: string;
      data?: {
        name?: string;
        value?: any;
        nodeStyle?: string;
        type?: string;
        [key: string]: any;
      };
      triggerLayoutAfterUpdate?: boolean;
    }) => {
      const { nodeId, data = {}, triggerLayoutAfterUpdate = false } = options;

      // Find the existing node
      const existingNode = getNodes().find((node) => node.id === nodeId);
      if (!existingNode) {
        console.error(`Node with ID ${nodeId} not found`);
        return false;
      }

      // Create updated node with merged data
      const updatedNode: Node = {
        ...existingNode,
        data: {
          ...existingNode.data,
          ...data,
          // For backward compatibility, ensure both nodeStyle and type are kept in sync
          nodeStyle: data.nodeStyle || data.type || existingNode.data?.nodeStyle || existingNode.data?.type,
          type: data.nodeStyle || data.type || existingNode.data?.nodeStyle || existingNode.data?.type,
        },
      };

      // Update nodes by replacing the specific node
      setNodes((nodes) => nodes.map((node) => (node.id === nodeId ? updatedNode : node)));

      // Optionally trigger layout recalculation
      if (triggerLayoutAfterUpdate) {
        triggerLayout();
      }

      return true;
    },
    [getNodes, setNodes, triggerLayout],
  );

  /**
   * Batch update multiple nodes at once
   */
  const updateNodes = useCallback(
    (
      updates: {
        nodeId: string;
        data: Record<string, any>;
      }[],
      triggerLayoutAfterUpdate = false,
    ) => {
      if (!updates || updates.length === 0) return false;

      // Create a map of node IDs to their updates for efficient lookup
      const updateMap = new Map(updates.map((update) => [update.nodeId, update.data]));

      // Update all nodes in a single state update for better performance
      setNodes((nodes) =>
        nodes.map((node) => {
          const updateData = updateMap.get(node.id);
          if (!updateData) return node;

          return {
            ...node,
            data: {
              ...node.data,
              ...updateData,
              // Keep nodeStyle and type in sync
              nodeStyle: updateData.nodeStyle || updateData.type || node.data?.nodeStyle || node.data?.type,
              type: updateData.nodeStyle || updateData.type || node.data?.nodeStyle || node.data?.type,
            },
          };
        }),
      );

      // Optionally trigger layout recalculation
      if (triggerLayoutAfterUpdate) {
        triggerLayout();
      }

      return true;
    },
    [setNodes, triggerLayout],
  );

  /**
   * Update node visual styles without changing other data
   */
  const updateNodeStyle = useCallback(
    (nodeId: string, style: string) => {
      return updateNode({
        nodeId,
        data: {
          nodeStyle: style,
          type: style, // For backward compatibility
        },
      });
    },
    [updateNode],
  );

  /**
   * Update node position using the node's handles
   * Useful for connecting nodes in a flow
   */
  const updateNodeConnections = useCallback(
    (nodeId: string, sourcePosition?: any, targetPosition?: any) => {
      // Find the existing node
      const existingNode = getNodes().find((node) => node.id === nodeId);
      if (!existingNode) {
        console.error(`Node with ID ${nodeId} not found`);
        return false;
      }

      // Create updated node with new connection positions
      const updatedNode: Node = {
        ...existingNode,
        sourcePosition: sourcePosition || existingNode.sourcePosition,
        targetPosition: targetPosition || existingNode.targetPosition,
      };

      // Update nodes by replacing the specific node
      setNodes((nodes) => nodes.map((node) => (node.id === nodeId ? updatedNode : node)));

      return true;
    },
    [getNodes, setNodes],
  );

  return {
    updateNode,
    updateNodes,
    updateNodeStyle,
    updateNodeConnections,
  };
}

export default useNodeUpdate;
