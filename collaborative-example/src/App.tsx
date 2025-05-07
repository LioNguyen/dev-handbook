import React, { DragEvent, useCallback, useRef } from "react";
import ReactFlow, {
  Node,
  ReactFlowProvider,
  Controls,
  useReactFlow,
  NodeMouseHandler,
} from "reactflow";

import Sidebar from "./Sidebar";
import useNodesStateSynced, { nodesMap } from "./useNodesStateSynced";
import useEdgesStateSynced from "./useEdgesStateSynced";

import "reactflow/dist/style.css";
import styles from "./style.module.css";

/**
 * Multi-user synchronization example for ReactFlow
 *
 * This component demonstrates how to use YJS to synchronize nodes and edges
 * between multiple users in real-time, allowing for collaborative diagram editing.
 */

// Pro account configuration options
const proOptions = {
  account: "paid-pro",
  hideAttribution: true,
};

/**
 * Generates a unique ID for new nodes
 * @returns A unique string ID
 */
const getId = () => `dndnode_${Math.random() * 10000}`;

/**
 * Handles the dragover event to allow dropping nodes
 * @param event The drag event
 */
const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  console.log("Dragging over flow area");
};

/**
 * Main ReactFlow component with synchronized state
 */
function ReactFlowPro() {
  // Reference to the wrapper div for calculating drop positions
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Custom hooks for synchronized state management with YJS
  const [nodes, onNodesChange] = useNodesStateSynced();
  const [edges, onEdgesChange, onConnect] = useEdgesStateSynced();

  // Get the project function to convert screen coordinates to flow coordinates
  const { project } = useReactFlow();

  /**
   * Handles dropping new nodes onto the canvas
   * @param event The drop event
   */
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    console.log("Drop detected on flow");

    if (wrapperRef.current) {
      // Get the bounds of the wrapper element
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();

      // Get the node type from the dragged data
      const type = event.dataTransfer.getData("application/reactflow");
      console.log("Creating new node of type:", type);

      // Calculate the position in the flow where the node was dropped
      const position = project({
        x: event.clientX - wrapperBounds.x - 80,
        y: event.clientY - wrapperBounds.top - 20,
      });

      // Create the new node
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      console.log("Adding new node:", newNode);

      // Add the node to the synchronized map (will update all connected clients)
      nodesMap.set(newNode.id, newNode);
    }
  };

  /**
   * Handles node click events to add visual feedback
   * Adds a blinking effect to clicked nodes, visible to all users for 3 seconds
   * @param _ Mouse event (unused)
   * @param node The clicked node
   */
  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    console.log("Node clicked:", node.id);

    const currentNode = nodesMap.get(node.id);
    if (currentNode) {
      console.log("Adding blink effect to node:", node.id);
      nodesMap.set(node.id, {
        ...currentNode,
        className: styles.blink,
      });
    }

    // Remove the blink effect after 3 seconds
    window.setTimeout(() => {
      const currentNode = nodesMap.get(node.id);
      if (currentNode) {
        console.log("Removing blink effect from node:", node.id);
        nodesMap.set(node.id, {
          ...currentNode,
          className: undefined,
        });
      }
    }, 3000);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.rfWrapper} ref={wrapperRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onNodeClick={onNodeClick}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          proOptions={proOptions}
        >
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

/**
 * Flow component
 * Wraps the main component with ReactFlowProvider to access the React Flow context
 */
export default function Flow() {
  console.log("Initializing synchronized Flow component");
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}
