// src/domains/canvas/previewCanvas/hooks/canvasHandlers/index.ts
import { useReactFlow } from "@xyflow/react";
import { useMemo } from "react";
import { useGetNodeTree } from "./useGetNodeTree";
import { useGetSelectionInfo } from "./useGetSelectionInfo";
import { useCenterOnNode } from "./useCenterOnNode";
import { useFindNodesByType } from "./useFindNodesByType";
import { useSelectNodes } from "./useSelectNodes";
import { useIsNodeDragging } from "./useIsNodeDragging";

// Xuất tất cả các hooks riêng lẻ để có thể sử dụng trực tiếp
export { useGetNodeTree, useGetSelectionInfo, useCenterOnNode, useFindNodesByType, useSelectNodes, useIsNodeDragging };

// Xuất các loại từ file types.ts
export * from "./types";

/**
 * Hook kết hợp tất cả các chức năng mở rộng
 */
export function useCanvasHandlers() {
  const reactFlow = useReactFlow();
  const centerOnNode = useCenterOnNode();
  const findNodesByType = useFindNodesByType();
  const getNodeTree = useGetNodeTree();
  const getSelectionInfo = useGetSelectionInfo();
  const selectNodes = useSelectNodes();
  const isNodeDragging = useIsNodeDragging();

  // Kết hợp các hooks thành một API duy nhất
  return useMemo(
    () => ({
      ...reactFlow,
      centerOnNode,
      findNodesByType,
      getNodeTree,
      getSelectionInfo,
      selectNodes,
      isNodeDragging,
    }),
    [reactFlow, centerOnNode, findNodesByType, getNodeTree, getSelectionInfo, selectNodes, isNodeDragging],
  );
}
