import React, { MouseEvent, DragEvent, useCallback, useRef } from "react";
import ReactFlow, {
  Node,
  ReactFlowProvider,
  useReactFlow,
  Background,
  BackgroundVariant,
  useStoreApi,
  MarkerType,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
} from "reactflow";

import Sidebar from "./Sidebar";
import SimpleNode from "./SimpleNode";
import GroupNode from "./GroupNode";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import { sortNodes, getId, getNodePositionInsideParent } from "./utils";
import SelectedNodesToolbar from "./SelectedNodesToolbar";

import "reactflow/dist/style.css";
import "@reactflow/node-resizer/dist/style.css";

import styles from "./style.module.css";

// Configure ReactFlow professional options to hide attribution
const proOptions = {
  hideAttribution: true,
};

// Handle drag over events during node dragging
const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  console.log(
    "🔍 @LIO ~ %cApp.tsx ~ DEBUG: onDragOver",
    "color: #00b7ff; font-weight: bold;"
  );

  event.dataTransfer.dropEffect = "move";
};

// Define custom node types used in the application
const nodeTypes = {
  node: SimpleNode,
  group: GroupNode,
};

// Default styling for connection edges
const defaultEdgeOptions = {
  style: {
    strokeWidth: 5,
  },
  markerEnd: {
    type: MarkerType.Arrow,
  },
};

function DynamicGrouping() {
  // Reference to the wrapper element for calculating drop positions
  const wrapperRef = useRef<HTMLDivElement>(null);

  // State hooks for managing nodes and edges with their change handlers
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Connect handler to create new edges between nodes
  const onConnect = useCallback(
    (edge: Edge | Connection) => {
      console.log(
        "🔍 @LIO ~ %cApp.tsx ~ DEBUG: onConnect",
        "color: #00b7ff; font-weight: bold;"
      );

      // Add the new edge to existing edges
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  // Access ReactFlow utility functions
  const { project, getIntersectingNodes } = useReactFlow();
  // Access the ReactFlow internal store
  const store = useStoreApi();

  // Handle node drop from sidebar to canvas
  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    console.log(
      "🔍 @LIO ~ %cApp.tsx ~ DEBUG: onDrop",
      "color: #00b7ff; font-weight: bold;"
    );
    if (wrapperRef.current) {
      // Get bounds of the wrapper element
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();

      // Get node type from drag data
      const type = event.dataTransfer.getData("application/reactflow");

      // Convert screen coordinates to flow coordinates
      let position = project({
        x: event.clientX - wrapperBounds.x - 20,
        y: event.clientY - wrapperBounds.top - 20,
      });

      // Set default styles for group nodes
      const nodeStyle =
        type === "group" ? { width: 400, height: 200 } : undefined;

      // Check if dropping on a group node
      const intersections = getIntersectingNodes({
        x: position.x,
        y: position.y,
        width: 40,
        height: 40,
      }).filter((n) => n.type === "group");
      const groupNode = intersections[0];

      // Create the new node
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
        style: nodeStyle,
      };

      // If dropping on a group, set parent-child relationship
      if (groupNode) {
        // Calculate position relative to the parent group
        newNode.position = getNodePositionInsideParent(
          {
            position,
            width: 40,
            height: 40,
          },
          groupNode
        ) ?? { x: 0, y: 0 };

        // Set parent relationship and constraint to parent boundaries
        newNode.parentNode = groupNode?.id;
        newNode.extent = groupNode ? "parent" : undefined;
      }

      // Sort nodes to ensure parents are rendered before children
      const sortedNodes = store
        .getState()
        .getNodes()
        .concat(newNode)
        .sort(sortNodes);
      setNodes(sortedNodes);
    }
  };

  // Handle node drag stop events
  const onNodeDragStop = useCallback(
    (_: MouseEvent, node: Node) => {
      // Skip handling for group nodes not in a parent
      if (node.type !== "node" && !node.parentNode) {
        return;
      }

      console.log(
        "🔍 @LIO ~ %cApp.tsx ~ DEBUG: onNodeDragStop",
        "color: #00b7ff; font-weight: bold;"
      );

      // Find intersecting group nodes
      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === "group"
      );
      const groupNode = intersections[0];

      // Update parent relationship if node is dragged to a different group
      if (intersections.length && node.parentNode !== groupNode?.id) {
        const nextNodes: Node[] = store
          .getState()
          .getNodes()
          .map((n) => {
            if (n.id === groupNode.id) {
              // Clear highlighting on the target group
              return {
                ...n,
                className: "",
              };
            } else if (n.id === node.id) {
              // Set new parent and position for the dragged node
              const position = getNodePositionInsideParent(n, groupNode) ?? {
                x: 0,
                y: 0,
              };

              return {
                ...n,
                position,
                parentNode: groupNode.id,
                extent: "parent" as "parent",
              };
            }

            return n;
          })
          .sort(sortNodes);

        setNodes(nextNodes);
      }
    },
    [getIntersectingNodes, setNodes, store]
  );

  // Handle node drag events for visual feedback
  const onNodeDrag = useCallback(
    (_: MouseEvent, node: Node) => {
      // Skip handling for group nodes not in a parent
      if (node.type !== "node" && !node.parentNode) {
        return;
      }

      console.log(
        "🔍 @LIO ~ %cApp.tsx ~ DEBUG: onNodeDrag",
        "color: #00b7ff; font-weight: bold;"
      );

      // Find intersecting group nodes
      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === "group"
      );

      // Determine if we should highlight a potential parent group
      const groupClassName =
        intersections.length && node.parentNode !== intersections[0]?.id
          ? "active"
          : "";

      // Update nodes with visual feedback
      setNodes((nds) => {
        return nds.map((n) => {
          if (n.type === "group") {
            // Apply highlight class to group nodes
            return {
              ...n,
              className: groupClassName,
            };
          } else if (n.id === node.id) {
            // Update position of dragged node
            return {
              ...n,
              position: node.position,
            };
          }

          return { ...n };
        });
      });
    },
    [getIntersectingNodes, setNodes]
  );

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.rfWrapper} ref={wrapperRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onDrop={onDrop}
          onDragOver={onDragOver}
          proOptions={proOptions}
          fitView
          selectNodesOnDrag={false}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          {/* Dotted background for visual grid */}
          <Background color="#bbb" gap={50} variant={BackgroundVariant.Dots} />
          {/* Toolbar for selected nodes */}
          <SelectedNodesToolbar />
        </ReactFlow>
      </div>
    </div>
  );
}

// Main component wrapped in ReactFlowProvider for context
export default function Flow() {
  return (
    <ReactFlowProvider>
      <DynamicGrouping />
    </ReactFlowProvider>
  );
}
