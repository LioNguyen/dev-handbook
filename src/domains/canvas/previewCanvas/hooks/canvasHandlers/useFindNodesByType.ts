// src/domains/canvas/previewCanvas/hooks/canvasHandlers/useFindNodesByType.ts
import { Node, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

/**
 * Hook để tìm các node theo loại
 */
export function useFindNodesByType() {
  const { getNodes } = useReactFlow();

  return useCallback(
    (type: string): Node[] => {
      return getNodes().filter((node) => node.type === type);
    },
    [getNodes],
  );
}
