// src/domains/canvas/hooks/handlers/nodeHandlers/useNodesDelete.ts
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

import { useGetNodeTree } from "../canvasHandlers/useGetNodeTree";
import useConfigCanvasAutoLayout from "../useConfigCanvasAutoLayout";

export function useNodesDelete() {
  const { setNodes, setEdges } = useReactFlow();
  const { triggerLayout } = useConfigCanvasAutoLayout();
  const getNodeTree = useGetNodeTree();

  /**
   * Deletes selected nodes using ReactFlow's selection mechanism
   * Uses reactFlowInstance to get selection info and perform deletion
   */

  /**
   * Deletes selected nodes using ReactFlow's selection mechanism
   * Uses reactFlowInstance to get selection info and perform deletion
   */

  /**
   * Deletes selected nodes using ReactFlow's selection mechanism
   * Uses reactFlowInstance to get selection info and perform deletion
   */
  const handleNodesDelete = useCallback(
    (ids?: string[], options?: { deleteChildren?: boolean }) => {
      const nodesToDelete = new Set<string>(ids || []);
      const edgesToDelete = new Set<string>();

      // If deleteChildren option is true, include all descendants
      if (options?.deleteChildren !== false) {
        ids?.forEach((nodeId) => {
          const nodeTree = getNodeTree(nodeId);

          // Add all descendant nodes to the deletion set
          nodeTree.treeNodeIds.forEach((id) => {
            if (id !== nodeId) {
              // The node itself is already included
              nodesToDelete.add(id);
            }
          });

          // Add all edges in the tree to the deletion set
          nodeTree.treeEdgeIds.forEach((id) => {
            edgesToDelete.add(id);
          });
        });
      }

      // Remove nodes that are in the deletion set
      setNodes((nodes) => nodes.filter((node) => !nodesToDelete.has(node.id)));

      // Remove edges connected to deleted nodes and edges in the deletion set
      setEdges((edges) =>
        edges.filter((edge) => {
          // Keep edges if neither source nor target is being deleted and the edge itself is not in the deletion set
          return !nodesToDelete.has(edge.source) && !nodesToDelete.has(edge.target) && !edgesToDelete.has(edge.id);
        }),
      );

      triggerLayout();
    },
    [getNodeTree, setNodes, setEdges, triggerLayout],
  );

  return handleNodesDelete;
}
