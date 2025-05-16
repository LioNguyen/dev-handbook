import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { NodeTree } from "./types";

/**
 * Hook to get a node tree starting from a root node
 */
export function useGetNodeTree() {
  const { getEdges } = useReactFlow();

  return useCallback(
    (nodeId: string): NodeTree => {
      const edges = getEdges();
      const treeNodeIds = new Set<string>();
      const treeEdgeIds = new Set<string>();

      // Initialize hierarchy maps
      const hierarchy = {
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
            // This is a connection from our node to a child node
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

            // Recursively find children of this child node
            findChildren(childId);
          }
        });
      };

      findChildren(nodeId);

      // Function to get all ancestors of a node
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

      // Function to get the depth of a node
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
        // Utility functions for hierarchy
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
        // Get all nodes at a specific level from the root
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
        // Check if a node is a leaf node (has no children)
        isLeaf: (id: string) => {
          const children = hierarchy.parentToChildren.get(id) || [];
          return children.length === 0;
        },
      };
    },
    [getEdges],
  );
}
