// src/domains/canvas/configCanvas/hooks/nodeHandlers/useNodeCreate.ts
import { Node, Position, useReactFlow, XYPosition } from "@xyflow/react";
import { useCallback } from "react";

import useConfigCanvasAutoLayout from "../useConfigCanvasAutoLayout";

export function useNodeCreate() {
  const { getNodes, setNodes, setEdges } = useReactFlow();
  const { triggerLayout } = useConfigCanvasAutoLayout();

  /**
   * Legacy single node creation function (maintained for compatibility)
   */
  const createNode = useCallback(
    (options: {
      position?: XYPosition;
      data?: {
        value?: any;
        [key: string]: any;
        _overrideId?: string;
      };
      parent?: {
        id: string | number;
        position?: XYPosition;
        sourcePosition?: Position;
        targetPosition?: Position;
      };
      nodeType?: string;
    }) => {
      const { position, data = {}, parent, nodeType = "custom" } = options;
      const { _overrideId } = data || {};

      // Determine if we're creating a standalone or child node
      const isChildNode = !!parent;

      let nodeId: string;
      let nodePosition: XYPosition;
      let sourcePos: Position | undefined;
      let targetPos: Position | undefined;

      // CHILD NODE LOGIC
      if (isChildNode) {
        // Find parent node if position wasn't provided
        const parentNode = getNodes().find((node) => node.id === parent.id);
        if (!parentNode && !parent.position) {
          console.error("Parent node not found and no position provided");
          return null;
        }

        // Get parent position either from provided value or from node
        const parentPosition = parent.position || parentNode?.position || { x: 0, y: 0 };

        // Get source and target positions
        sourcePos = parent.sourcePosition || parentNode?.sourcePosition || Position.Right;
        targetPos = parent.targetPosition || parentNode?.targetPosition || Position.Left;

        // Generate ID for child node
        nodeId = _overrideId || `${parent.id}__${new Date().getTime()}`;

        // Determine position offset based on source position
        let posOffset = { x: 0, y: 100 }; // Default for bottom
        if (sourcePos === Position.Right) {
          posOffset = { x: 350, y: 0 };
        } else if (sourcePos === Position.Left) {
          posOffset = { x: -100, y: 0 };
        } else if (sourcePos === Position.Top) {
          posOffset = { x: 0, y: -100 };
        }

        // Calculate child node position
        nodePosition = {
          x: parentPosition.x + posOffset.x,
          y: parentPosition.y + posOffset.y,
        };

        // Create the edge connecting the parent to the new node
        const newEdge = {
          id: `${parent.id}->${nodeId}`,
          source: String(parent.id), // Ensure source is a string
          target: nodeId,
        };

        // Add the edge
        setEdges((edges) => [...edges, newEdge]);
      }
      // STANDALONE NODE LOGIC
      else {
        if (!position) {
          console.error("Position is required for standalone nodes");
          return null;
        }

        // Generate ID for standalone node
        nodeId = _overrideId || `standalone_${new Date().getTime()}`;
        nodePosition = position;
      }

      // Create the new node with appropriate data
      const newNode: Node = {
        id: nodeId,
        type: nodeType,
        position: nodePosition,
        data,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
      };

      // Add the node
      setNodes((nodes) => [...nodes, newNode]);

      triggerLayout();

      return nodeId;
    },
    [getNodes, setNodes, setEdges, triggerLayout],
  );

  return {
    createNode,
  };
}
