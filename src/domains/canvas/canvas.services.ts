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
const nodesWithOrder = initialNodes.map((node) => ({
  ...node,
  data: {
    ...node.data,
    order: node.data.order || "",
  },
}));

export function useCanvasService() {
  // const createCanvasState = usePost<CanvasResponse, CreateCanvasRequest>("/canvas");
  // const getCanvasAllState = useGetAll<CanvasResponse[], GetCanvasAllRequest>("/canvas");
  // const getCanvasByIdState = useGetById<CanvasResponse, GetCanvasByIdRequest>(`/canvas`);
  // const updateCanvasState = usePut<CanvasResponse, UpdateCanvasRequest>(`/canvas/:id`);

  const getInitialNodes = () => nodesWithOrder;
  const getInitialEdges = () => initialEdges;

  return {
    // createCanvasState,
    // getCanvasAllState,
    // getCanvasByIdState,
    // updateCanvasState,
    getInitialNodes,
    getInitialEdges,
  };
}
