// src/domains/canvas/hooks/handlers/nodeHandlers.ts
import { Edge, Node, Position, XYPosition } from "@xyflow/react"; // Add Edge import
import { useCallback } from "react";

import { useCanvas } from "../../canvas.context";
import { useHighlightHandlers } from "./highlightHandlers";
import { useViewHandlers } from "./viewHandlers";

export function useNodeHandlers() {
  const { nodes, edges, setNodes, setEdges, highlightedNodeId } = useCanvas();
  const { highlightNodes } = useHighlightHandlers();
  const { fitView, fitViewForNode } = useViewHandlers();

  /**
   * Toggles expansion state for a specific node by ID
   */
  const toggleNodeExpansion = useCallback(
    (nodeId: string) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === nodeId && n.data?.expandable) {
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
          if (n.id === nodeId && !n.data?.expandable) {
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
                  expanded: hasRemainingChildren ? node.data?.expanded : false,
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

  /**
   * Changes the parent of a node
   * This is used when a node is dragged onto another node
   */
  const changeNodeParent = useCallback(
    (nodeId: string, newParentId: string) => {
      // First check if this would create a circular reference
      // (A node can't be the parent of one of its ancestors)
      const wouldCreateCircular = (targetId: string, potentialChildId: string): boolean => {
        if (targetId === potentialChildId) return true;

        // Check if the potential child is already a parent (or grandparent, etc.) of the target
        const childEdges = edges.filter((e) => e.target === targetId);
        for (const edge of childEdges) {
          if (wouldCreateCircular(edge.source, potentialChildId)) {
            return true;
          }
        }

        return false;
      };

      // Don't allow circular references
      if (wouldCreateCircular(newParentId, nodeId)) {
        console.warn("Cannot create circular parent-child relationship");
        return false;
      }

      // If the node is already a child of the new parent, do nothing
      const existingEdge = edges.find((e) => e.source === newParentId && e.target === nodeId);
      if (existingEdge) {
        return false;
      }

      // Get the current parent if any
      const currentParentEdge = edges.find((e) => e.target === nodeId);
      const currentParentId = currentParentEdge?.source;

      // Remove the edge from the current parent if exists
      if (currentParentId) {
        setEdges((edges) => edges.filter((e) => !(e.source === currentParentId && e.target === nodeId)));
      }

      // Create a new edge to the new parent
      // Fix: Properly type the edge
      const newEdge: Edge = {
        id: `${newParentId}->${nodeId}`,
        source: newParentId,
        target: nodeId,
      };

      setEdges((edges) => [...edges, newEdge]);

      // Update the node order based on the new parent
      let childrenCount = 0;
      let parentOrder = "";

      // Get the new parent order and count existing children
      setNodes((currentNodes) => {
        const parentNode = currentNodes.find((n) => n.id === newParentId);
        // Fix: Ensure parentOrder is always a string
        parentOrder = parentNode?.data?.order ? String(parentNode.data.order) : "";

        // Count children of the new parent
        childrenCount = currentNodes.filter((n) => {
          const edge = edges.find((e) => e.source === newParentId && e.target === n.id);
          return edge !== undefined && n.id !== nodeId;
        }).length;

        return currentNodes;
      });

      // Set the new order for the node
      const newOrder = parentOrder ? `${parentOrder}.${childrenCount + 1}` : `${childrenCount + 1}`;

      // Update the node
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                order: newOrder,
              },
            };
          }
          return node;
        }),
      );

      // Mark the new parent as expandable and expanded
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === newParentId) {
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

      // Check if the old parent still has children
      if (currentParentId) {
        const oldParentStillHasChildren = edges.some((e) => e.source === currentParentId && e.target !== nodeId);

        if (!oldParentStillHasChildren) {
          // Update the old parent to not be expandable
          setNodes((nodes) =>
            nodes.map((node) => {
              if (node.id === currentParentId) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    expandable: false,
                    expanded: false,
                  },
                };
              }
              return node;
            }),
          );
        }
      }

      // Ensure the layout updates properly
      setTimeout(() => {
        fitView();
      }, 50);

      return true;
    },
    [nodes, edges, setNodes, setEdges, fitView],
  );

  /**
   * Creates a new standalone node at the specified position
   */
  const createStandaloneNode = useCallback(
    (position: XYPosition) => {
      // Generate a unique ID for the new node
      const newNodeId = `${new Date().getTime()}`;

      // Create the new node object
      const newNode: Node = {
        id: newNodeId,
        type: "custom", // Use your custom node type
        position, // Use the position from the double-click
        data: {
          label: `Node ${newNodeId.substring(5)}`,
          value: `Node ${newNodeId.substring(5)}`,
          subtext: "STANDALONE",
          type: "standalone",
          expandable: false,
          expanded: false,
        },
        // Set any other default properties you need
      };

      // Add the node to the canvas
      setNodes((nds) => [...nds, newNode]);

      // Optionally highlight the new node
      if (highlightNodes) {
        highlightNodes(newNodeId);
      }
    },
    [setNodes, highlightNodes],
  );

  /**
   * Creates a child node connected to a parent node with improved parameter structure
   */
  const createChildNode = useCallback(
    (options: {
      data?: {
        name?: string;
        value?: string;
        type?: string;
        subtext?: string;
        [key: string]: any;
        _overrideId?: string;
      };
      parent: {
        id: string | number;
        position?: XYPosition;
        sourcePosition?: Position;
        targetPosition?: Position;
      };
      nodeType?: string;
    }) => {
      const { data = {}, parent, nodeType = "custom" } = options;
      const { name, value, type = "ip", subtext, _overrideId } = data;

      // Find parent node if position wasn't provided
      const parentNode = nodes.find((node) => node.id === parent.id);
      if (!parentNode && !parent.position) {
        console.error("Parent node not found and no position provided");
        return null;
      }

      // Get parent position either from provided value or from node
      const parentPosition = parent.position || parentNode?.position || { x: 0, y: 0 };

      // Get source and target positions
      const sourcePosition = parent.sourcePosition || parentNode?.sourcePosition || Position.Right;
      const targetPosition = parent.targetPosition || parentNode?.targetPosition || Position.Left;

      // Generate a unique ID for the new node using timestamp
      const newNodeId = _overrideId || `${parent.id}__${new Date().getTime()}`;

      // Determine position offset based on source position
      let posOffset = { x: 0, y: 100 }; // Default for bottom
      if (sourcePosition === Position.Right) {
        posOffset = { x: 100, y: 0 };
      } else if (sourcePosition === Position.Left) {
        posOffset = { x: -100, y: 0 };
      } else if (sourcePosition === Position.Top) {
        posOffset = { x: 0, y: -100 };
      }

      // Count existing children for the order property
      const childrenCount = nodes.filter((n) => n.id.startsWith(`${parent.id}__`)).length;

      // Get parent node order
      const parentNode2 = nodes.find((n) => n.id === parent.id);
      const parentOrder = parentNode2?.data?.order ? String(parentNode2.data.order) : "";

      // Calculate the new order
      const newOrder = parentOrder ? `${parentOrder}.${childrenCount + 1}` : `${childrenCount + 1}`;

      // Create the new node with appropriate data
      const newNode: Node = {
        id: newNodeId,
        type: nodeType,
        position: {
          x: parentPosition.x + posOffset.x,
          y: parentPosition.y + posOffset.y,
        },
        data: {
          ...data, // Preserve all original data properties
          order: newOrder,
          value: value || name || `127.0.0.${Math.floor(Math.random() * 255)}`,
          name: name || value || `Node ${childrenCount + 1}`,
          expandable: false,
          expanded: false,
          type: type,
          subtext: subtext || type?.toUpperCase() || "IP ADDRESS",
        },
        sourcePosition,
        targetPosition,
      };

      // Create the edge connecting the parent to the new node
      const newEdge: Edge = {
        id: `${parent.id}->${newNodeId}`,
        source: String(parent.id), // Ensure source is a string
        target: newNodeId,
      };

      // Add the node and edge
      setNodes((nodes) => [...nodes, newNode]);
      setEdges((edges) => [...edges, newEdge]);

      // If parent is not expanded, expand it
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === parent.id) {
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

      // Focus the view on the new node
      setTimeout(() => {
        setTimeout(() => {
          fitViewForNode(newNodeId);
        }, 50);
      }, 10);

      return newNodeId;
    },
    [nodes, setNodes, setEdges, fitViewForNode],
  );

  /**
   * Toggles an 'add' node when a custom node is selected/deselected
   * Refactored to use createChildNode and deleteNode
   */
  const toggleAddNode = useCallback(
    (parentId: string, isSelected: boolean) => {
      const addNodeId = `add-${parentId}`;

      // If already toggled and we're toggling again, remove existing add node
      const existingAddNode = nodes.find((node) => node.id === addNodeId);

      if (existingAddNode) {
        deleteNode(addNodeId);

        // If we want to select it again, we need to wait for delete to complete
        if (isSelected) {
          setTimeout(() => createAddNode(), 50);
        }
        return;
      }

      // If no existing node and we want to select, create new add node
      if (isSelected) {
        createAddNode();
      }

      // Function to create the add node using createChildNode
      function createAddNode() {
        const parentNode = nodes.find((node) => node.id === parentId);
        if (!parentNode) return;

        const parentPosition = { x: parentNode.position.x, y: parentNode.position.y };

        // Call createChildNode with appropriate options
        createChildNode({
          parent: {
            id: parentId,
            sourcePosition: parentNode.sourcePosition,
            targetPosition: parentNode.targetPosition,
          },
          data: {
            parentId,
            parentPosition,
            label: "+ Add Child",
            value: "+ Add",
            subtext: "NEW NODE",
            type: "add",
            // Override the automatic ID generation to use our specific format
            _overrideId: addNodeId,
          },
          nodeType: "add", // Use the add node type
        });

        // Transform the created node to customize any properties
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === addNodeId) {
              // Make the node position closer to the parent
              // Determine position offset based on source position
              const sourcePosition = parentNode.sourcePosition || Position.Right;
              let posOffset = { x: 0, y: 50 }; // Default below the node

              if (sourcePosition === Position.Right) {
                posOffset = { x: 80, y: 0 };
              } else if (sourcePosition === Position.Left) {
                posOffset = { x: -80, y: 0 };
              } else if (sourcePosition === Position.Top) {
                posOffset = { x: 0, y: -50 };
              }

              return {
                ...node,
                id: addNodeId, // Ensure correct ID is set
                position: {
                  x: parentNode.position.x + posOffset.x,
                  y: parentNode.position.y + posOffset.y,
                },
              };
            }
            return node;
          }),
        );

        // Update edge ID to follow the specific format
        setEdges((edges) =>
          edges.map((edge) => {
            if (edge.target === addNodeId) {
              return {
                ...edge,
                id: `${parentId}->${addNodeId}`,
              };
            }
            return edge;
          }),
        );

        // Focus view on the add node
        setTimeout(() => {
          fitViewForNode(addNodeId);
        }, 60);
      }
    },
    [nodes, createChildNode, deleteNode, setNodes, setEdges, fitViewForNode],
  );

  return {
    toggleNodeExpansion,
    markNodeAsExpandable,
    addNode,
    deleteNode,
    getNodes,
    changeNodeParent,
    createStandaloneNode,
    toggleAddNode,
    createChildNode,
  };
}
