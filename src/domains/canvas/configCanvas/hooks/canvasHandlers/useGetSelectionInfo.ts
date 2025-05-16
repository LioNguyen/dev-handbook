// src/domains/canvas/previewCanvas/hooks/canvasHandlers/useGetSelectionInfo.ts
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { SelectionInfo } from "./types";
import { useGetNodeTree } from "./useGetNodeTree";

/**
 * Hook để lấy thông tin về các node và edge được chọn
 */
export function useGetSelectionInfo() {
  const { getNodes, getEdges } = useReactFlow();
  const getNodeTree = useGetNodeTree();

  return useCallback((): SelectionInfo => {
    const nodes = getNodes();
    const edges = getEdges();

    // Tìm các node được chọn chính (được chọn thủ công bởi người dùng)
    const primaryNodeIds = new Set<string>();
    const primaryNodes: any = [];

    nodes.forEach((node) => {
      // Bỏ qua các node có loại "add" hoặc "root"
      if (node.selected && node.type !== "root") {
        primaryNodeIds.add(node.id);
        primaryNodes.push(node);
      }
    });

    // Tìm các node con cháu của các node được chọn chính
    const descendantNodeIds = new Set<string>();
    const descendantEdgeIds = new Set<string>();
    const descendantNodes: any = [];

    // Xử lý từng node chính để tìm các con cháu của nó
    primaryNodeIds.forEach((nodeId) => {
      // Sử dụng getNodeTree để tìm tất cả con cháu
      const nodeTree = getNodeTree(nodeId);

      // Bỏ qua node cha và các node có loại "add" hoặc "root"
      nodeTree.treeNodeIds.forEach((id) => {
        if (id !== nodeId && !primaryNodeIds.has(id)) {
          const node = nodes.find((n) => n.id === id);
          if (node && node.type !== "root") {
            descendantNodeIds.add(id);
          }
        }
      });

      // Chỉ thêm các edge không kết nối với các loại node bị loại trừ
      nodeTree.treeEdgeIds.forEach((edgeId) => {
        const edge = edges.find((e) => e.id === edgeId);
        if (edge) {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);

          if (sourceNode && targetNode && sourceNode.type !== "root" && targetNode.type !== "root") {
            descendantEdgeIds.add(edgeId);
          }
        }
      });
    });

    // Lấy các node con cháu thực tế
    nodes.forEach((node) => {
      if (descendantNodeIds.has(node.id)) {
        descendantNodes.push(node);
      }
    });

    // Tìm tất cả các edge được chọn thủ công, ngoại trừ những edge kết nối với các node "add" hoặc "root"
    const primaryEdgeIds = new Set<string>();
    const primaryEdges: any = [];

    edges.forEach((edge) => {
      if (edge.selected) {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);

        if (sourceNode && targetNode && sourceNode.type !== "root" && targetNode.type !== "root") {
          primaryEdgeIds.add(edge.id);
          primaryEdges.push(edge);
        }
      }
    });

    // Kết hợp các lựa chọn
    const allSelectedNodeIds = new Set([...primaryNodeIds, ...descendantNodeIds]);
    const allSelectedNodes = [...primaryNodes, ...descendantNodes];
    const allSelectedEdgeIds = new Set([...primaryEdgeIds, ...descendantEdgeIds]);
    const allSelectedEdges = [
      ...primaryEdges,
      ...edges.filter((edge) => descendantEdgeIds.has(edge.id) && !primaryEdgeIds.has(edge.id)),
    ];

    return {
      selectedNodes: allSelectedNodes,
      selectedNodeIds: allSelectedNodeIds,
      selectedEdges: allSelectedEdges,
      selectedEdgeIds: allSelectedEdgeIds,
    };
  }, [getNodes, getEdges, getNodeTree]);
}
