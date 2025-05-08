import { useCallback } from "react";
import { Node, Position } from "reactflow";
import { useCanvas } from "../../canvas.context";
import { useHighlightHandlers } from "./highlightHandlers";
import { useViewHandlers } from "./viewHandlers";

export function useNodeHandlers() {
  const { edges, setNodes, setEdges, highlightedNodeId } = useCanvas();
  const { highlightNodes } = useHighlightHandlers();
  const { fitView, fitViewForNode } = useViewHandlers();

  /**
   * Toggles expansion state for a specific node by ID
   */
  const toggleNodeExpansion = useCallback(
    (nodeId: string) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === nodeId && n.data.expandable) {
            // Toggle the expanded state of the node
            const newExpandState = !n.data.expanded;

            return {
              ...n,
              data: { ...n.data, expanded: newExpandState },
            };
          }
          return n;
        }),
      );
    },
    [setNodes],
  );

  /**
   * Marks a node as expandable
   */
  const markNodeAsExpandable = useCallback(
    (nodeId: string) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === nodeId && !n.data.expandable) {
            return {
              ...n,
              data: { ...n.data, expandable: true },
            };
          }
          return n;
        }),
      );
    },
    [setNodes],
  );

  /**
   * Adds a new node to the graph
   */
  const addNode = useCallback(
    (nodeData: Partial<Node>) => {
      setNodes((nodes) => [...nodes, nodeData as Node]);
    },
    [setNodes],
  );

  /**
   * Adds a child node connected to a parent node
   */
  const addChildNode = useCallback(
    (
      parentId: string,
      parentPosition: { x: number; y: number },
      sourcePosition: Position,
      targetPosition: Position,
      nodeData: Partial<any> = {},
    ) => {
      // Generate a unique ID for the new node using timestamp
      const newNodeId = `${parentId}__${new Date().getTime()}`;

      // Determine position offset based on source position
      let posOffset = { x: 0, y: 100 }; // Default for bottom
      if (sourcePosition === Position.Right) {
        posOffset = { x: 100, y: 0 };
      } else if (sourcePosition === Position.Left) {
        posOffset = { x: -100, y: 0 };
      } else if (sourcePosition === Position.Top) {
        posOffset = { x: 0, y: -100 };
      }

      // Get the count of existing children for order
      let childrenCount = 0;
      setNodes((currentNodes) => {
        childrenCount = currentNodes.filter((n) => n.id.startsWith(`${parentId}__`)).length;
        return currentNodes;
      });

      // Get parent node order
      let parentOrder = "";
      setNodes((currentNodes) => {
        const parentNode = currentNodes.find((n) => n.id === parentId);
        parentOrder = parentNode?.data?.order || "";
        return currentNodes;
      });

      const newOrder = parentOrder ? `${parentOrder}.${childrenCount + 1}` : `${childrenCount + 1}`;

      // Create the new node
      const newNode: Node = {
        id: newNodeId,
        type: "custom",
        position: {
          x: parentPosition.x + posOffset.x,
          y: parentPosition.y + posOffset.y,
        },
        data: {
          order: newOrder,
          value: nodeData.value || `127.0.0.${Math.floor(Math.random() * 255)}`,
          expandable: false,
          expanded: false,
          type: nodeData.type || "ip",
          subtext: nodeData.subtext || "IP ADDRESS",
          ...nodeData,
        },
        sourcePosition,
        targetPosition,
      };

      // Create the edge connecting the parent to the new node
      const newEdge = {
        id: `${parentId}->${newNodeId}`,
        source: parentId,
        target: newNodeId,
      };

      // Add the node and edge
      setNodes((nodes) => [...nodes, newNode]);
      setEdges((edges) => [...edges, newEdge]);

      // If parent is not expanded, expand it
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === parentId) {
            return {
              ...node,
              data: {
                ...node.data,
                expandable: true,
                expanded: true,
              },
            };
          }
          return node;
        }),
      );

      // Use the new fitViewForNode function for better focusing
      setTimeout(() => {
        // First make sure the DOM has updated and the layout is calculated
        setTimeout(() => {
          fitViewForNode(newNodeId);
        }, 50);
      }, 10);

      return newNodeId;
    },
    [setNodes, setEdges, fitViewForNode],
  );

  /**
   * Deletes a node and its connected edges
   */
  const deleteNode = useCallback(
    (nodeId: string) => {
      // Find potential parent node ID before deletion
      let parentNodeId: string | undefined;
      const parentEdge = edges.find((edge) => edge.target === nodeId);
      if (parentEdge) {
        parentNodeId = parentEdge.source;
      }

      // Get all child nodes before deleting them
      const childNodeIds: string[] = [];
      edges.forEach((edge) => {
        if (edge.source === nodeId) {
          childNodeIds.push(edge.target);
        }
      });

      // If node has children, recursively delete them first
      if (childNodeIds.length > 0) {
        // Create a new array to avoid mutation during iteration
        const childrenToDelete = [...childNodeIds];
        childrenToDelete.forEach((childId) => {
          deleteNode(childId);
        });
      }

      // Remove the node
      setNodes((currentNodes) => currentNodes.filter((node) => node.id !== nodeId));

      // Remove any edges connected to this node
      setEdges((currentEdges) => currentEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));

      // If we found a parent, check if it needs to update expandability
      if (parentNodeId) {
        // Check if the parent still has any children after this node is removed
        const remainingEdges = edges.filter((edge) => edge.source === parentNodeId && edge.target !== nodeId);

        const hasRemainingChildren = remainingEdges.length > 0;

        // Update the parent's expandability state
        setNodes((currentNodes) =>
          currentNodes.map((node) => {
            if (node.id === parentNodeId) {
              return {
                ...node,
                data: {
                  ...node.data,
                  expandable: hasRemainingChildren,
                  expanded: hasRemainingChildren ? node.data.expanded : false,
                },
              };
            }
            return node;
          }),
        );
      }

      // Clear highlighting if the deleted node was highlighted
      if (nodeId === highlightedNodeId) {
        highlightNodes("");
      }

      // Fit view after node deletion
      setTimeout(() => {
        fitView();
      }, 50);
    },
    [edges, setNodes, setEdges, fitView, highlightedNodeId, highlightNodes],
  );

  /**
   * Get nodes from ReactFlow instance or state
   */
  const getNodes = useCallback(() => {
    let resultNodes: Node[] = [];
    setNodes((currentNodes) => {
      resultNodes = [...currentNodes];
      return currentNodes;
    });

    return resultNodes;
  }, [setNodes]);

  return {
    toggleNodeExpansion,
    markNodeAsExpandable,
    addNode,
    addChildNode,
    deleteNode,
    getNodes,
  };
}
