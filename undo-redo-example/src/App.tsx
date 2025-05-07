// 1. Main React Flow Component with Undo/Redo Functionality

// This example demonstrates how to implement a simple undo and redo functionality for a React Flow graph.
// It captures snapshots of the graph state at key interaction points to enable undoing and redoing actions.
import React, { CSSProperties, useCallback } from "react";
import ReactFlow, {
  Background,
  Panel,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  useReactFlow,
  NodeOrigin,
  Node,
  Edge,
  DefaultEdgeOptions,
  ProOptions,
  OnConnect,
  NodeDragHandler,
  SelectionDragHandler,
  OnNodesDelete,
  OnEdgesDelete,
} from "reactflow";

import useUndoRedo from "./useUndoRedo";

import "reactflow/dist/style.css";
import styles from "./styles.module.css";

/**
 * Array of labels for nodes that will be added to the graph
 * Once all labels are used, they will cycle back from the beginning
 */
const nodeLabels: string[] = [
  "Wire",
  "your",
  "ideas",
  "with",
  "React",
  "Flow",
  "!",
];

// ReactFlow Pro configuration to hide attribution
const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };

// Start with empty graph
const defaultNodes: Node[] = [];
const defaultEdges: Edge[] = [];

// Default style for edges
const defaultEdgeOptions: DefaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: "#ff0071" },
};

// Style for connection line while dragging to create edges
const connectionLineStyle: CSSProperties = {
  strokeWidth: 2,
  stroke: "#ff99c7",
};

// Center node origin for better positioning
const nodeOrigin: NodeOrigin = [0.5, 0.5];

/**
 * Main ReactFlow component with undo/redo functionality
 * Demonstrates how to:
 * - Create an interactive graph with undo/redo capabilities
 * - Track user actions that modify the graph
 * - Allow reverting and restoring those actions
 */
function ReactFlowPro() {
  console.log("Rendering ReactFlowPro component with undo/redo functionality");

  // Get undo/redo functions and state from our custom hook
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  // Initialize nodes and edges state with React Flow hooks
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  // Get ReactFlow utility functions
  const { project, addNodes } = useReactFlow();

  /**
   * Handle connecting nodes with edges
   * Takes a snapshot before adding an edge to enable undoing this action
   */
  const onConnect: OnConnect = useCallback(
    (connection) => {
      console.log("Creating new connection:", connection);
      // Take a snapshot of the current state before modifying
      takeSnapshot();
      setEdges((edges) => addEdge(connection, edges));
      console.log("Added new edge to graph");
    },
    [setEdges, takeSnapshot]
  );

  /**
   * Handle clicks on the canvas/pane to add new nodes
   * Takes a snapshot before adding a node to enable undoing this action
   */
  const onPaneClick = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>) => {
      console.log("Pane clicked, adding new node");
      // Take a snapshot of the current state before modifying
      takeSnapshot();

      // Convert screen coordinates to flow coordinates
      const position = project({ x: evt.clientX, y: evt.clientY });

      // Get the next label from our rotating list
      const label = nodeLabels.shift();
      console.log(
        `Creating node with label: "${label}" at position:`,
        position
      );

      // Add the new node
      addNodes([
        {
          id: `${new Date().getTime()}`,
          data: { label },
          position,
          className: styles.node,
        },
      ]);

      // Move the used label to the end of the array for reuse
      nodeLabels.push(`${label}`);
    },
    [takeSnapshot, addNodes, project]
  );

  /**
   * Handle the start of node dragging
   * Takes a snapshot to enable undoing the position change
   */
  const onNodeDragStart: NodeDragHandler = useCallback(
    (event, node) => {
      console.log(`Node drag started: ${node.id}`);
      // Take a snapshot of the current state before modifying
      takeSnapshot();
    },
    [takeSnapshot]
  );

  /**
   * Handle the start of dragging multiple selected nodes
   * Takes a snapshot to enable undoing the position changes
   */
  const onSelectionDragStart: SelectionDragHandler = useCallback(
    (event, nodes) => {
      console.log(`Selection drag started with ${nodes.length} nodes`);
      // Take a snapshot of the current state before modifying
      takeSnapshot();
    },
    [takeSnapshot]
  );

  /**
   * Handle node deletion
   * Takes a snapshot to enable undoing the deletion
   */
  const onNodesDelete: OnNodesDelete = useCallback(
    (nodesToDelete) => {
      console.log(`Deleting ${nodesToDelete.length} nodes`);
      // Take a snapshot of the current state before modifying
      takeSnapshot();
    },
    [takeSnapshot]
  );

  /**
   * Handle edge deletion
   * Takes a snapshot to enable undoing the deletion
   */
  const onEdgesDelete: OnEdgesDelete = useCallback(
    (edgesToDelete) => {
      console.log(`Deleting ${edgesToDelete.length} edges`);
      // Take a snapshot of the current state before modifying
      takeSnapshot();
    },
    [takeSnapshot]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={proOptions}
      onConnect={onConnect}
      onNodeDragStart={onNodeDragStart}
      onSelectionDragStart={onSelectionDragStart}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      defaultEdgeOptions={defaultEdgeOptions}
      onPaneClick={onPaneClick}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      selectNodesOnDrag={false}
      onInit={() => {
        console.log("ReactFlow initialized");
      }}
    >
      <Background />
      <Controls />
      <Panel position="bottom-center">
        <div className={styles.buttonGroup}>
          <button
            disabled={canUndo}
            className={styles.button}
            onClick={() => {
              console.log("Undo button clicked");
              undo();
            }}
          >
            <span className={styles.buttonIcon}>⤴️</span> undo
          </button>
          <button
            disabled={canRedo}
            className={styles.button}
            onClick={() => {
              console.log("Redo button clicked");
              redo();
            }}
          >
            redo <span className={styles.buttonIcon}>⤵️</span>
          </button>
        </div>
      </Panel>
      {!nodes.length && (
        <div className={styles.instructions}>
          Click anywhere on the pane to add nodes
        </div>
      )}
    </ReactFlow>
  );
}

/**
 * Wrapper component that provides ReactFlow context
 * @param props Props to pass to the main component
 */
function ReactFlowWrapper(props: any) {
  console.log("Initializing ReactFlowWrapper with props:", props);
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
