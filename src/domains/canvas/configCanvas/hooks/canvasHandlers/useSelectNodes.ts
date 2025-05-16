// src/domains/canvas/previewCanvas/hooks/canvasHandlers/useSelectNodes.ts
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useGetNodeTree } from "./useGetNodeTree";
import { applyEdgesStyles, applyNodesStyles } from "@/domains/canvas/utils";

/**
 * Hook để chọn các node
 */
export function useSelectNodes() {
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const getNodeTree = useGetNodeTree();

  return useCallback(
    (
      nodeIds: string[],
      options = {
        center: false,
        selectChildren: true,
      },
    ) => {
      // Đầu tiên, xóa lựa chọn trước đó bằng cách bỏ chọn tất cả các node và edge
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          selected: false,
          className: node.className?.replace(/\bselected-child\b/g, "").trim() || undefined,
          data: {
            ...node.data,
            // Chỉ dành cho trạng thái cục bộ, sẽ xóa khi gọi API
            state: {
              ...(node.data?.state || {}),
              isParentSelected: false,
              isChildSelected: false,
            },
          },
        })),
      );
      setEdges((edges) =>
        edges.map((edge) => ({
          ...edge,
          selected: false,
          data: {
            ...edge.data,
            state: {
              ...(edge.data?.state || {}),
              isSelected: false,
            },
          },
        })),
      );

      // Nếu nodeIds rỗng, chỉ trả về (hiệu quả là xóa lựa chọn)
      if (nodeIds.length === 0) return;

      // Lấy nodeId (chúng tôi chỉ sử dụng cái đầu tiên cho đơn giản)
      const nodeId = nodeIds[0];

      if (options.selectChildren) {
        // Chọn node và tất cả con cháu của nó cộng với các edge liên quan
        const nodeTree = getNodeTree(nodeId);

        // Cập nhật các node - node gốc và tất cả con cháu
        setNodes((nodes) => {
          // Trước tiên cập nhật trạng thái đã chọn cho node và con cháu
          const updatedNodes = nodes.map((node) => {
            const isRoot = node.id === nodeId;
            const isDescendant = nodeTree.treeNodeIds.has(node.id) && !isRoot;

            return {
              ...node,
              selected: isRoot || isDescendant,
              data: {
                ...node.data,
                // Chỉ dành cho trạng thái cục bộ, sẽ xóa khi gọi API
                state: {
                  ...(node.data?.state || {}),
                  isParentSelected: isRoot,
                  isChildSelected: isDescendant,
                },
              },
            };
          });

          // Sau đó áp dụng các styles cho nodes
          return applyNodesStyles(updatedNodes, getEdges(), {});
        });

        // Cập nhật các edge - chọn tất cả các edge trong cây
        setEdges((edges) => {
          // Trước tiên cập nhật trạng thái đã chọn cho edges
          const updatedEdges = edges.map((edge) => {
            if (nodeTree.treeEdgeIds.has(edge.id)) {
              return {
                ...edge,
                selected: true,
                data: {
                  ...edge.data,
                  // Chỉ dành cho trạng thái cục bộ, sẽ xóa khi gọi API
                  state: {
                    ...(edge.data?.state || {}),
                    isSelected: true,
                  },
                },
              };
            }
            return edge;
          });

          // Sau đó áp dụng các styles cho edges
          return applyEdgesStyles(getNodes(), updatedEdges);
        });
      } else {
        // Chỉ chọn node đơn
        setNodes((nodes) => {
          // Trước tiên cập nhật trạng thái đã chọn cho node
          const updatedNodes = nodes.map((node) => {
            return {
              ...node,
              selected: node.id === nodeId,
              data: {
                ...node.data,
                // Chỉ dành cho trạng thái cục bộ, sẽ xóa khi gọi API
                state: {
                  ...(node.data?.state || {}),
                  isParentSelected: node.id === nodeId,
                  isChildSelected: false,
                },
              },
            };
          });

          // Sau đó áp dụng các styles cho nodes
          return applyNodesStyles(updatedNodes, getEdges(), {});
        });

        // Đảm bảo chúng ta cũng cập nhật style cho edges mặc dù không có edge nào được chọn
        setEdges((edges) => {
          return applyEdgesStyles(getNodes(), edges);
        });
      }
    },
    [getNodeTree, setNodes, setEdges, getNodes, getEdges],
  );
}
