// src/domains/canvas/previewCanvas/hooks/canvasHandlers/useCenterOnNode.ts
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

/**
 * Hook để trung tâm hóa view trên một node cụ thể
 */
export function useCenterOnNode() {
  const { getNode, setCenter } = useReactFlow();

  return useCallback(
    (nodeId: string, options: { zoom?: number; padding?: number } = {}) => {
      const node = getNode(nodeId);
      if (!node) return;

      setCenter(node.position.x + (node.width || 0) / 2, node.position.y + (node.height || 0) / 2, {
        zoom: options.zoom || 1.5,
        duration: 800,
      });
    },
    [getNode, setCenter],
  );
}
