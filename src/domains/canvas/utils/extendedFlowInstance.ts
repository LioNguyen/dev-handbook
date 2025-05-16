import { Edge, Node, ReactFlowInstance } from "@xyflow/react";
import { NodeHierarchy } from "./nodeEdgeUtils";

export type ExtendedReactFlowInstance = ReactFlowInstance & {
  // Custom methods
  centerOnNode: (nodeId: string, options?: { zoom?: number; padding?: number }) => void;
  findNodesByType: (type: string) => Node[];
  getNodeTree: (nodeId: string) => ReturnType<typeof getNodeTree>;
  getSelectionInfo: () => {
    selectedNodes: Node[];
    selectedNodeIds: Set<string>;
    selectedEdges: Edge[];
    selectedEdgeIds: Set<string>;
  };

  // Node selection method
  selectNodes: (
    nodeIds: string[],
    options?: {
      center?: boolean;
      selectChildren?: boolean;
    },
  ) => void;

  // Node deletion method
  deleteNodes: (
    nodeIds: string[],
    options?: {
      deleteChildren?: boolean;
    },
  ) => void;

  // Method to check if any node is being dragged
  isNodeDragging: () => boolean;
};

export function extendReactFlowInstance(instance: ReactFlowInstance | null): ExtendedReactFlowInstance | null {
  if (!instance) return null;

  const extendedInstance = instance as ExtendedReactFlowInstance;

  // Add custom methods
  extendedInstance.centerOnNode = (nodeId: string, options = {}) => {
    const node = instance.getNode(nodeId);
    if (!node) return;

    instance.setCenter(node.position.x + (node.width || 0) / 2, node.position.y + (node.height || 0) / 2, {
      zoom: options.zoom || 1.5,
      duration: 800,
    });
  };

  extendedInstance.findNodesByType = (type: string) => {
    return instance.getNodes().filter((node) => node.type === type);
  };

  extendedInstance.getNodeTree = (nodeId: string) => {
    return getNodeTree(nodeId, instance.getEdges());
  };

  extendedInstance.getSelectionInfo = () => {
    return getSelectionInfo(instance.getNodes(), instance.getEdges());
  };

  extendedInstance.selectNodes = (
    nodeIds: string[],
    options = {
      center: false,
      selectChildren: true,
    },
  ) => {
    // First, clear previous selection by deselecting all nodes and edges
    instance.setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        selected: false,
        className: node.className?.replace(/\bselected-child\b/g, "").trim() || undefined,
        data: {
          ...node.data,
          // Just for local state, will remove when post API
          state: {
            ...(node.data?.state || {}),
            isParentSelected: false,
            isChildSelected: false,
          },
        },
      })),
    );
    instance.setEdges((edges) =>
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

    // If nodeIds is empty, just return (effectively clearing selection)
    if (nodeIds.length === 0) return;

    // Get the nodeId (we only use the first one for simplicity)
    const nodeId = nodeIds[0];

    if (options.selectChildren) {
      // Select node and all its descendants plus relevant edges
      const nodeTree = getNodeTree(nodeId, instance.getEdges());

      // Update nodes - the root node and all descendants
      instance.setNodes((nodes) => {
        return nodes.map((node) => {
          const isRoot = node.id === nodeId;
          const isDescendant = nodeTree.treeNodeIds.has(node.id) && !isRoot;

          return {
            ...node,
            selected: isRoot || isDescendant,
            data: {
              ...node.data,
              // Just for local state, will remove when post API
              state: {
                ...(node.data?.state || {}),
                isParentSelected: isRoot,
                isChildSelected: isDescendant,
              },
            },
          };
        });
      });

      // Update edges - select all edges in the tree
      instance.setEdges((edges) => {
        return edges.map((edge) => {
          if (nodeTree.treeEdgeIds.has(edge.id)) {
            return {
              ...edge,
              selected: true,
              data: {
                ...edge.data,
                // Just for local state, will remove when post API
                state: {
                  ...(edge.data?.state || {}),
                  isSelected: true,
                },
              },
            };
          }
          return edge;
        });
      });
    } else {
      // Select only the single node
      instance.setNodes((nodes) => {
        return nodes.map((node) => {
          return {
            ...node,
            selected: node.id === nodeId,
            data: {
              ...node.data,
              // Just for local state, will remove when post API
              state: {
                ...(node.data?.state || {}),
                isParentSelected: node.id === nodeId,
                isChildSelected: false,
              },
            },
          };
        });
      });
    }
  };

  extendedInstance.deleteNodes = (
    nodeIds: string[],
    options = {
      deleteChildren: true,
    },
  ) => {
    if (nodeIds.length === 0) return;

    const nodesToDelete = new Set<string>(nodeIds);
    const edgesToDelete = new Set<string>();

    // If deleteChildren option is true, include all descendants
    if (options.deleteChildren) {
      nodeIds.forEach((nodeId) => {
        const nodeTree = getNodeTree(nodeId, instance.getEdges());

        // Add all descendant nodes to the deletion set
        nodeTree.treeNodeIds.forEach((id) => {
          if (id !== nodeId) {
            // The node itself is already included
            nodesToDelete.add(id);
          }
        });

        // Add all edges in the tree to the deletion set
        nodeTree.treeEdgeIds.forEach((id) => {
          edgesToDelete.add(id);
        });
      });
    }

    // Remove nodes that are in the deletion set
    instance.setNodes((nodes) => nodes.filter((node) => !nodesToDelete.has(node.id)));

    // Remove edges connected to deleted nodes and edges in the deletion set
    instance.setEdges((edges) =>
      edges.filter((edge) => {
        // Keep edges if neither source nor target is being deleted and the edge itself is not in the deletion set
        return !nodesToDelete.has(edge.source) && !nodesToDelete.has(edge.target) && !edgesToDelete.has(edge.id);
      }),
    );
  };

  extendedInstance.isNodeDragging = () => instance.getNodes().some((node) => node.dragging === true);

  return extendedInstance;
}

/**
 * Function to get all nodes and edges in a tree rooted at the given node,
 * including hierarchical parent-child relationships
 */
function getNodeTree(nodeId: string, edges: Edge[]) {
  const treeNodeIds = new Set<string>();
  const treeEdgeIds = new Set<string>();

  // Initialize hierarchy maps
  const hierarchy: NodeHierarchy = {
    parentToChildren: new Map<string, string[]>(),
    childToParent: new Map<string, string>(),
  };

  // Recursive function to find all children
  const findChildren = (id: string) => {
    // Add this node to the set
    treeNodeIds.add(id);

    // Initialize children array for this parent
    if (!hierarchy.parentToChildren.has(id)) {
      hierarchy.parentToChildren.set(id, []);
    }

    // Find all direct children
    edges.forEach((edge) => {
      if (edge.source === id) {
        // This is a connection from our node to a child
        const childId = edge.target;
        treeEdgeIds.add(edge.id);
        treeNodeIds.add(childId);

        // Add to parent-child relationship map
        const children = hierarchy.parentToChildren.get(id) || [];
        if (!children.includes(childId)) {
          children.push(childId);
          hierarchy.parentToChildren.set(id, children);
        }

        // Add to child-parent relationship map
        hierarchy.childToParent.set(childId, id);

        // Recursively find children of this child
        findChildren(childId);
      }
    });
  };

  findChildren(nodeId);

  return {
    treeNodeIds,
    treeEdgeIds,
    hierarchy,
    // Convenient helper functions for the hierarchy
    getChildren: (id: string) => hierarchy.parentToChildren.get(id) || [],
    getParent: (id: string) => hierarchy.childToParent.get(id),
    getAncestors: (id: string) => {
      const ancestors: string[] = [];
      let currentId = id;
      while (true) {
        const parentId = hierarchy.childToParent.get(currentId);
        if (!parentId) break;
        ancestors.push(parentId);
        currentId = parentId;
      }
      return ancestors;
    },
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
    getDepth: (id: string) => {
      let depth = 0;
      let currentId = id;
      while (true) {
        const parentId = hierarchy.childToParent.get(currentId);
        if (!parentId) break;
        depth++;
        currentId = parentId;
      }
      return depth;
    },
    // Get all nodes at a specific depth level from the root
    getNodesAtLevel: (level: number) => {
      const result: string[] = [];
      treeNodeIds.forEach((id) => {
        const nodeDepth = hierarchy.childToParent.has(id)
          ? id === nodeId
            ? 0
            : getNodeTree(nodeId, edges).getDepth(id)
          : 0;
        if (nodeDepth === level) {
          result.push(id);
        }
      });
      return result;
    },
    // Check if a node is a leaf (has no children)
    isLeaf: (id: string) => {
      const children = hierarchy.parentToChildren.get(id) || [];
      return children.length === 0;
    },
  };
}

/**
 * Function to get all selected nodes and edges, excluding nodes with type "add" or "root"
 */
function getSelectionInfo(nodes: Node[], edges: Edge[]) {
  // Find primary selected nodes (manually selected by user)
  const primaryNodeIds = new Set<string>();
  const primaryNodes: Node[] = [];

  nodes.forEach((node) => {
    // Skip nodes with type "add" or "root"
    if (node.selected && node.type !== "root") {
      primaryNodeIds.add(node.id);
      primaryNodes.push(node);
    }
  });

  // Find descendant nodes of primary selected nodes
  const descendantNodeIds = new Set<string>();
  const descendantEdgeIds = new Set<string>();
  const descendantNodes: Node[] = [];

  // Process each primary node to find its descendants
  primaryNodeIds.forEach((nodeId) => {
    // Use getNodeTree to find all descendants
    const nodeTree = getNodeTree(nodeId, edges);

    // Skip the parent node itself and nodes with type "add" or "root"
    nodeTree.treeNodeIds.forEach((id) => {
      if (id !== nodeId && !primaryNodeIds.has(id)) {
        const node = nodes.find((n) => n.id === id);
        if (node && node.type !== "root") {
          descendantNodeIds.add(id);
        }
      }
    });

    // Add only edges that don't connect to excluded node types
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

  // Get the actual descendant nodes
  nodes.forEach((node) => {
    if (descendantNodeIds.has(node.id)) {
      descendantNodes.push(node);
    }
  });

  // Find all manually selected edges, excluding those connected to "add" or "root" nodes
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

  // Combine selections
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
}
