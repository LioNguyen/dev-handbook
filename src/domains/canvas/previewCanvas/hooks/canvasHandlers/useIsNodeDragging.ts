// src/domains/canvas/previewCanvas/hooks/canvasHandlers/useIsNodeDragging.ts
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

/**
 * Hook để kiểm tra xem có node nào đang được kéo không
 */
export function useIsNodeDragging() {
  const { getNodes } = useReactFlow();

  return useCallback((): boolean => {
    return getNodes().some((node) => node.dragging === true);
  }, [getNodes]);
}
