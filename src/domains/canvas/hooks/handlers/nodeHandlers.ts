// src/domains/canvas/hooks/handlers/nodeHandlers.ts
import { Edge, Node, Position, XYPosition } from "@xyflow/react";
import { useCallback } from "react";

import { useCanvas } from "../../canvas.context";

export function useNodeHandlers() {
  const { nodes, edges, setNodes, setEdges, reactFlowInstance, triggerLayout } = useCanvas();

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

      // Ensure the layout updates properly
      triggerLayout();

      return true;
    },
    [edges, setNodes, setEdges, triggerLayout],
  );

  /**
   * Unified function to create standalone or child nodes
   */
  const createNode = useCallback(
    (options: {
      position?: XYPosition;
      data?: {
        name?: string;
        value?: string;
        type?: string;
        subtext?: string;
        [key: string]: any;
        _overrideId?: string;
      };
      parent?: {
        id: string | number;
        position?: XYPosition;
        sourcePosition?: Position;
        targetPosition?: Position;
      };
      nodeType?: string;
    }) => {
      const { position, data = {}, parent, nodeType = "custom" } = options;
      const { name, value, type = "ip", subtext, _overrideId } = data;

      // Determine if we're creating a standalone or child node
      const isChildNode = !!parent;

      let nodeId: string;
      let nodePosition: XYPosition;
      let sourcePos: Position | undefined;
      let targetPos: Position | undefined;

      // CHILD NODE LOGIC
      if (isChildNode) {
        // Find parent node if position wasn't provided
        const parentNode = nodes.find((node) => node.id === parent.id);
        if (!parentNode && !parent.position) {
          console.error("Parent node not found and no position provided");
          return null;
        }

        // Get parent position either from provided value or from node
        const parentPosition = parent.position || parentNode?.position || { x: 0, y: 0 };

        // Get source and target positions
        sourcePos = parent.sourcePosition || parentNode?.sourcePosition || Position.Right;
        targetPos = parent.targetPosition || parentNode?.targetPosition || Position.Left;

        // Generate ID for child node
        nodeId = _overrideId || `${parent.id}__${new Date().getTime()}`;

        // Determine position offset based on source position
        let posOffset = { x: 0, y: 100 }; // Default for bottom
        if (sourcePos === Position.Right) {
          posOffset = { x: 350, y: 0 };
        } else if (sourcePos === Position.Left) {
          posOffset = { x: -100, y: 0 };
        } else if (sourcePos === Position.Top) {
          posOffset = { x: 0, y: -100 };
        }

        // Calculate child node position
        nodePosition = {
          x: parentPosition.x + posOffset.x,
          y: parentPosition.y + posOffset.y,
        };

        // Create the edge connecting the parent to the new node
        const newEdge: Edge = {
          id: `${parent.id}->${nodeId}`,
          source: String(parent.id), // Ensure source is a string
          target: nodeId,
        };

        // Add the edge
        setEdges((edges) => [...edges, newEdge]);
      }
      // STANDALONE NODE LOGIC
      else {
        if (!position) {
          console.error("Position is required for standalone nodes");
          return null;
        }

        // Generate ID for standalone node
        nodeId = _overrideId || `standalone_${new Date().getTime()}`;
        nodePosition = position;
      }

      // Create the new node with appropriate data
      const newNode: Node = {
        id: nodeId,
        type: nodeType,
        position: nodePosition,
        data: {
          ...data, // Preserve all original data properties
          value:
            value ||
            name ||
            (isChildNode ? `127.0.0.${Math.floor(Math.random() * 255)}` : `Node ${nodeId.substring(5)}`),
          name: name || value || (isChildNode ? "Child Node" : `Node ${nodeId.substring(5)}`),
          type: type,
          subtext: subtext || type?.toUpperCase() || (isChildNode ? "IP ADDRESS" : "STANDALONE"),
        },
        sourcePosition: sourcePos,
        targetPosition: targetPos,
      };

      // Add the node
      setNodes((nodes) => [...nodes, newNode]);

      triggerLayout();

      return nodeId;
    },
    [nodes, setNodes, setEdges, triggerLayout],
  );

  /**
   * Toggles an 'add' node when a custom node is selected/deselected
   */
  const toggleAddNode = useCallback(
    (parentId: string, isSelected: boolean) => {
      const addNodeId = `add-${parentId}`;

      // If already toggled and we're toggling again, remove existing add node
      const existingAddNode = nodes.find((node) => node.id === addNodeId);

      if (existingAddNode) {
        reactFlowInstance?.deleteNodes([addNodeId]);

        // If we want to select it again, we need to wait for delete to complete
        if (isSelected) {
          setTimeout(() => createAddNode(), 50);
        }

        triggerLayout();
        return;
      }

      // If no existing node and we want to select, create new add node
      if (isSelected) {
        createAddNode();
      }

      // Function to create the add node using the new createNode function
      function createAddNode() {
        const parentNode = nodes.find((node) => node.id === parentId);
        if (!parentNode) return;

        const parentPosition = { x: parentNode.position.x, y: parentNode.position.y };

        // Call createNode with appropriate options
        createNode({
          parent: {
            id: parentId,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
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
      }
    },
    [nodes, createNode, reactFlowInstance, triggerLayout],
  );

  /**
   * Handle node drag start
   */
  const handleNodeDragStart = useCallback((event: React.MouseEvent, node: Node) => {
    event.stopPropagation();

    if (node.type === "add" || node.type === "root") return;
  }, []);

  /**
   * Handle node drag
   */
  const handleNodeDrag = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();

      if (node.type === "add" || node.type === "root") return;

      // Get elements at the mouse position
      const elementsAtPoint = document.elementsFromPoint(event.clientX, event.clientY);

      // Find potential drop targets
      let dropTargetId: string | null = null;

      for (const element of elementsAtPoint) {
        if (element.classList.contains("react-flow__node") && element instanceof HTMLElement) {
          const targetId = element.getAttribute("data-id");
          if (targetId && targetId !== node.id) {
            dropTargetId = targetId;
            break;
          }
        }
      }

      // Update drop target states
      setNodes((nodes) =>
        nodes.map((n) => {
          if (dropTargetId && n.id === dropTargetId) {
            return {
              ...n,
              data: {
                ...n.data,
                isDropTarget: true,
              },
            };
          } else if (n.data?.isDropTarget) {
            return {
              ...n,
              data: {
                ...n.data,
                isDropTarget: false,
              },
            };
          }
          return n;
        }),
      );

      // Save potential drop target on the dragging node
      setNodes((nodes) =>
        nodes.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                dropTargetId,
              },
            };
          }
          return n;
        }),
      );
    },
    [setNodes],
  );

  /**
   * Handle node drag stop
   */
  const handleNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();

      if (node.type === "add" || node.type === "root") return;

      // Get the potential drop target
      const dropTargetId = node.data?.dropTargetId;

      // If we have a drop target, change the parent
      if (dropTargetId && dropTargetId !== node.id) {
        console.log(`Changing parent: ${node.id} -> ${dropTargetId}`);
        // Fix: Ensure dropTargetId is a string
        changeNodeParent(node.id, String(dropTargetId));
      }

      // Reset all drag-related states
      setNodes((nodes) =>
        nodes.map((n) => ({
          ...n,
          data: {
            ...n.data,
            isDropTarget: false,
            dropTargetId: null,
          },
        })),
      );
    },
    [changeNodeParent, setNodes],
  );

  /**
   * Deletes selected nodes using ReactFlow's selection mechanism
   * Uses reactFlowInstance to get selection info and perform deletion
   */
  const handleNodesDelete = useCallback(
    (ids?: string[], options?: { deleteChildren?: boolean }) => {
      if (!reactFlowInstance) return;

      const selectionInfo = reactFlowInstance.getSelectionInfo();
      const nodesToDelete = ids || [...(selectionInfo?.selectedNodeIds || [])];

      if (nodesToDelete.length > 0) {
        reactFlowInstance.deleteNodes(nodesToDelete, {
          deleteChildren: options?.deleteChildren ?? true,
        });

        triggerLayout();
      }
    },
    [reactFlowInstance, triggerLayout],
  );

  return {
    changeNodeParent,
    createNode,
    toggleAddNode,
    handleNodesDelete,
    handleNodeDragStart,
    handleNodeDrag,
    handleNodeDragStop,
  };
}
