// src/domains/canvas/previewCanvas/hooks/canvasHandlers/useGetNodeTree.ts
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { NodeTree } from "./types";

/**
 * Hook để lấy cây node bắt đầu từ một node gốc
 */
export function useGetNodeTree() {
  const { getEdges } = useReactFlow();

  return useCallback(
    (nodeId: string): NodeTree => {
      const edges = getEdges();
      const treeNodeIds = new Set<string>();
      const treeEdgeIds = new Set<string>();

      // Khởi tạo bản đồ phân cấp
      const hierarchy = {
        parentToChildren: new Map<string, string[]>(),
        childToParent: new Map<string, string>(),
      };

      // Hàm đệ quy để tìm tất cả các con
      const findChildren = (id: string) => {
        // Thêm node này vào set
        treeNodeIds.add(id);

        // Khởi tạo mảng con cho parent này
        if (!hierarchy.parentToChildren.has(id)) {
          hierarchy.parentToChildren.set(id, []);
        }

        // Tìm tất cả các con trực tiếp
        edges.forEach((edge) => {
          if (edge.source === id) {
            // Đây là kết nối từ node của chúng ta đến một node con
            const childId = edge.target;
            treeEdgeIds.add(edge.id);
            treeNodeIds.add(childId);

            // Thêm vào bản đồ quan hệ parent-child
            const children = hierarchy.parentToChildren.get(id) || [];
            if (!children.includes(childId)) {
              children.push(childId);
              hierarchy.parentToChildren.set(id, children);
            }

            // Thêm vào bản đồ quan hệ child-parent
            hierarchy.childToParent.set(childId, id);

            // Tìm con của node con này một cách đệ quy
            findChildren(childId);
          }
        });
      };

      findChildren(nodeId);

      // Hàm để lấy tất cả tổ tiên của một node
      const getAncestors = (id: string) => {
        const ancestors: string[] = [];
        let currentId = id;
        while (true) {
          const parentId = hierarchy.childToParent.get(currentId);
          if (!parentId) break;
          ancestors.push(parentId);
          currentId = parentId;
        }
        return ancestors;
      };

      // Hàm để lấy độ sâu của một node
      const getDepth = (id: string) => {
        let depth = 0;
        let currentId = id;
        while (true) {
          const parentId = hierarchy.childToParent.get(currentId);
          if (!parentId) break;
          depth++;
          currentId = parentId;
        }
        return depth;
      };

      return {
        treeNodeIds,
        treeEdgeIds,
        hierarchy,
        // Các hàm tiện ích cho phân cấp
        getChildren: (id: string) => hierarchy.parentToChildren.get(id) || [],
        getParent: (id: string) => hierarchy.childToParent.get(id),
        getAncestors,
        getDescendants: (id: string) => {
          const descendants: string[] = [];
          const stack = [...(hierarchy.parentToChildren.get(id) || [])];

          while (stack.length > 0) {
            const currentId = stack.pop()!;
            descendants.push(currentId);
            const children = hierarchy.parentToChildren.get(currentId) || [];
            stack.push(...children);
          }

          return descendants;
        },
        getDepth,
        // Lấy tất cả các node ở một cấp độ cụ thể từ gốc
        getNodesAtLevel: (level: number) => {
          const result: string[] = [];
          treeNodeIds.forEach((id) => {
            const nodeDepth = hierarchy.childToParent.has(id) ? (id === nodeId ? 0 : getDepth(id)) : 0;
            if (nodeDepth === level) {
              result.push(id);
            }
          });
          return result;
        },
        // Kiểm tra xem một node có phải là node lá (không có con) không
        isLeaf: (id: string) => {
          const children = hierarchy.parentToChildren.get(id) || [];
          return children.length === 0;
        },
      };
    },
    [getEdges],
  );
}
