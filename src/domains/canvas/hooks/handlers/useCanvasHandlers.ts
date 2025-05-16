import { Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback, useMemo } from "react";
import { applyEdgesStyles, applyNodesStyles } from "../../utils";

// Type cho cấu trúc phân cấp node
export type NodeHierarchy = {
  parentToChildren: Map<string, string[]>;
  childToParent: Map<string, string>;
};

// Type cho kết quả của getNodeTree
export type NodeTree = {
  treeNodeIds: Set<string>;
  treeEdgeIds: Set<string>;
  hierarchy: NodeHierarchy;
  getChildren: (id: string) => string[];
  getParent: (id: string) => string | undefined;
  getAncestors: (id: string) => string[];
  getDescendants: (id: string) => string[];
  getDepth: (id: string) => number;
  getNodesAtLevel: (level: number) => string[];
  isLeaf: (id: string) => boolean;
};

// Type cho kết quả của getSelectionInfo
export type SelectionInfo = {
  selectedNodes: Node[];
  selectedNodeIds: Set<string>;
  selectedEdges: Edge[];
  selectedEdgeIds: Set<string>;
};

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
      const hierarchy: NodeHierarchy = {
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
    const primaryNodes: Node[] = [];

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
    const descendantNodes: Node[] = [];

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
    const primaryEdges: Edge[] = [];

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
          return applyNodesStyles(updatedNodes, getEdges());
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
          return applyNodesStyles(updatedNodes, getEdges());
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

/**
 * Hook để xóa các node
 */
export function useDeleteNodes() {
  const { setNodes, setEdges } = useReactFlow();
  const getNodeTree = useGetNodeTree();

  return useCallback(
    (
      nodeIds: string[],
      options = {
        deleteChildren: true,
      },
    ) => {
      if (nodeIds.length === 0) return;

      const nodesToDelete = new Set<string>(nodeIds);
      const edgesToDelete = new Set<string>();

      // Nếu tùy chọn deleteChildren là true, bao gồm tất cả con cháu
      if (options.deleteChildren) {
        nodeIds.forEach((nodeId) => {
          const nodeTree = getNodeTree(nodeId);

          // Thêm tất cả các node con cháu vào tập hợp xóa
          nodeTree.treeNodeIds.forEach((id) => {
            if (id !== nodeId) {
              // Node này đã được bao gồm
              nodesToDelete.add(id);
            }
          });

          // Thêm tất cả các edge trong cây vào tập hợp xóa
          nodeTree.treeEdgeIds.forEach((id) => {
            edgesToDelete.add(id);
          });
        });
      }

      // Xóa các node thuộc tập hợp xóa
      setNodes((nodes) => nodes.filter((node) => !nodesToDelete.has(node.id)));

      // Xóa các edge kết nối đến các node bị xóa và các edge trong tập hợp xóa
      setEdges((edges) =>
        edges.filter((edge) => {
          // Giữ các edge nếu cả source và target không bị xóa và chính edge không nằm trong tập hợp xóa
          return !nodesToDelete.has(edge.source) && !nodesToDelete.has(edge.target) && !edgesToDelete.has(edge.id);
        }),
      );
    },
    [getNodeTree, setNodes, setEdges],
  );
}

/**
 * Hook để kiểm tra xem có node nào đang được kéo không
 */
export function useIsNodeDragging() {
  const { getNodes } = useReactFlow();

  return useCallback((): boolean => {
    return getNodes().some((node) => node.dragging === true);
  }, [getNodes]);
}

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
  const deleteNodes = useDeleteNodes();
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
      deleteNodes,
      isNodeDragging,
    }),
    [reactFlow, centerOnNode, findNodesByType, getNodeTree, getSelectionInfo, selectNodes, deleteNodes, isNodeDragging],
  );
}
