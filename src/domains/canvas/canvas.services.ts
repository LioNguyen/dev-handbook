import { useCallback } from "react";
import { edges as initialEdges, nodes as initialNodes } from "./canvas.data";
// import { useGetAll, useGetById, usePost, usePut } from "@/core/api/hooks";
// import {
//   CanvasResponse,
//   CreateCanvasRequest,
//   GetCanvasAllRequest,
//   GetCanvasByIdRequest,
//   UpdateCanvasRequest,
// } from "./canvas.types";

// Add order property to initial nodes if not already present
// const nodesWithOrder = initialNodes.map((node) => ({
//   ...node,
//   data: {
//     ...node.data,
//     order: node.data.order || "",
//   },
// }));

export function useCanvasService() {
  // const createCanvasState = usePost<CanvasResponse, CreateCanvasRequest>("/canvas");
  // const getCanvasAllState = useGetAll<CanvasResponse[], GetCanvasAllRequest>("/canvas");
  // const getCanvasByIdState = useGetById<CanvasResponse, GetCanvasByIdRequest>(`/canvas`);
  // const updateCanvasState = usePut<CanvasResponse, UpdateCanvasRequest>(`/canvas/:id`);

  // Get initial nodes
  const getInitialNodes = useCallback(() => {
    return initialNodes.map((node) => ({
      ...node,
      // Make sure position is an XYPosition
      position: { x: node.position.x, y: node.position.y },
      // Make sure data is correctly typed
      data: {
        ...node.data,
        // Add any required fields
        visible: true,
      },
    }));
  }, []);

  // Get initial edges
  const getInitialEdges = useCallback(() => {
    return initialEdges;
  }, []);

  return {
    // createCanvasState,
    // getCanvasAllState,
    // getCanvasByIdState,
    // updateCanvasState,
    getInitialNodes,
    getInitialEdges,
  };
}
