import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Edge,
  Node,
  OnConnect,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import useCopyPaste from "./useCopyPaste";

import "reactflow/dist/style.css";
import styles from "./styles.module.css";

/**
 * Initial nodes configuration
 * Three nodes stacked vertically with 100px spacing
 */
const initialNodes: Node[] = [
  {
    id: "a",
    className: styles.node,
    data: { label: "A" },
    position: { x: 0, y: 0 },
  },
  {
    id: "b",
    className: styles.node,
    data: { label: "B" },
    position: { x: 0, y: 100 },
  },
  {
    id: "c",
    className: styles.node,
    data: { label: "C" },
    position: { x: 0, y: 200 },
  },
];

/**
 * Initial edges configuration
 * Connects node A to B, and B to C
 */
const initialEdges: Edge[] = [
  { id: "a->b", source: "a", target: "b" },
  { id: "b->c", source: "b", target: "c" },
];

// Options for the fitView functionality to ensure all nodes are visible
const fitViewOptions = { padding: 1 };

/**
 * ReactFlowPro component - Main component implementing copy/paste functionality
 * Demonstrates how to implement clipboard operations in a flow diagram
 */
function ReactFlowPro() {
  console.log("Rendering ReactFlowPro component");

  // Initialize nodes state with the ability to track changes
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  console.log("Current nodes:", nodes);

  // Initialize edges state with the ability to track changes
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  console.log("Current edges:", edges);

  /**
   * Handles new connections between nodes
   * @param connection - The connection data containing source and target
   */
  const onConnect: OnConnect = useCallback(
    (connection) => {
      console.log("Creating new connection:", connection);
      setEdges((edges) => addEdge(connection, edges));
    },
    [setEdges]
  );

  // Get copy/paste functionality from the custom hook
  const { cut, copy, paste, bufferedNodes } = useCopyPaste();
  console.log("Buffered nodes for paste:", bufferedNodes);

  // Determine if copy/paste buttons should be enabled
  const canCopy = nodes.some(({ selected }) => selected);
  const canPaste = bufferedNodes.length > 0;

  console.log("Copy operation available:", canCopy);
  console.log("Paste operation available:", canPaste);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
    >
      {/* Control panel with clipboard operation buttons */}
      <Panel className={styles.buttonGroup} position="top-left">
        <button
          className={styles.button}
          onClick={() => {
            console.log("Cut operation triggered");
            cut();
          }}
          disabled={!canCopy}
        >
          cut
        </button>
        <button
          className={styles.button}
          onClick={() => {
            console.log("Copy operation triggered");
            copy();
          }}
          disabled={!canCopy}
        >
          copy
        </button>
        <button
          className={styles.button}
          onClick={() => {
            console.log("Paste operation triggered at position (0,0)");
            paste({ x: 0, y: 0 });
          }}
          disabled={!canPaste}
        >
          paste
        </button>
      </Panel>
    </ReactFlow>
  );
}

/**
 * ReactFlowWrapper component
 * Wraps the main component with ReactFlowProvider to ensure proper context access
 * @param props - Props to be passed to the ReactFlowPro component
 */
const ReactFlowWrapper = (props: any) => {
  console.log("Initializing ReactFlowWrapper with props:", props);
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
};

export default ReactFlowWrapper;
