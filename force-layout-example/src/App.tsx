// 1. Main React Flow Component with Force Layout
import React, { useCallback, MouseEvent } from "react";
import ReactFlow, {
  Background,
  Panel,
  ProOptions,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  NodeOrigin,
  NodeMouseHandler,
  addEdge,
  OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";

import useForceLayout from "./useForceLayout";
import { initialNodes, initialEdges } from "./initialElements";

import styles from "./styles.module.css";

/**
 * ReactFlow Pro options to hide attribution
 */
const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };

/**
 * Props for the force-directed layout example
 */
type ExampleProps = {
  strength?: number; // Repulsion force between nodes (negative value)
  distance?: number; // Preferred distance between connected nodes
};

/**
 * Set node origin to center for better positioning with force layout
 */
const nodeOrigin: NodeOrigin = [0.5, 0.5];

/**
 * Default styling for edges
 */
const defaultEdgeOptions = { style: { stroke: "#ff66aa", strokeWidth: 3 } };

/**
 * Array of emoji characters to use as node labels
 */
const emojis = ["👍", "👌", "👏", "👋", "🙌"];

/**
 * Returns a random emoji from the emojis array
 * @returns A random emoji character
 */
const randomEmoji = (): string => {
  console.log("Generating random emoji for new node");
  return emojis[Math.floor(Math.random() * (emojis.length - 1))];
};

/**
 * Main ReactFlow component with force-directed layout
 * Implements an interactive graph where:
 * - Clicking on the canvas adds a new disconnected node
 * - Clicking on a node adds a new connected node
 * - All nodes are arranged automatically using D3's force simulation
 */
function ReactFlowPro({ strength = -1000, distance = 150 }: ExampleProps = {}) {
  console.log("Rendering ReactFlowPro with force layout", {
    strength,
    distance,
  });

  const { project } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Apply force-directed layout to nodes
  useForceLayout({ strength, distance });

  /**
   * Handle clicks on the canvas to add new nodes
   * @param evt Mouse event with click coordinates
   */
  const onPaneClick = useCallback(
    (evt: MouseEvent) => {
      // Convert screen coordinates to flow coordinates
      const position = project({ x: evt.clientX, y: evt.clientY });
      console.log(`Pane clicked at position: (${position.x}, ${position.y})`);

      // Create new node at click position
      const newNodeId = `${nodes.length + 1}`;
      console.log(`Creating new node with ID: ${newNodeId}`);

      setNodes((nds) => [
        ...nds,
        {
          id: newNodeId,
          position,
          data: { label: randomEmoji() },
          className: styles.node,
        },
      ]);
    },
    [project, setNodes, nodes.length]
  );

  /**
   * Handle clicks on nodes to add connected child nodes
   * @param evt Mouse event (unused)
   * @param node The clicked node
   */
  const onNodeClick: NodeMouseHandler = useCallback(
    (evt, node) => {
      console.log(
        `Node clicked: ${node.id} at position (${node.position.x}, ${node.position.y})`
      );

      // Create child node and connecting edge
      const childId = `${nodes.length + 1}`;
      console.log(`Creating child node with ID: ${childId}`);

      const childNode = {
        id: childId,
        position: { x: node.position.x + 100, y: node.position.y + 100 },
        data: { label: randomEmoji() },
        className: styles.node,
      };

      const childEdge = {
        id: `${node.id}->${childId}`,
        source: node.id,
        target: childId,
      };
      console.log(`Creating edge from ${node.id} to ${childId}`);

      setNodes((nds) => [...nds, childNode]);
      setEdges((eds) => [...eds, childEdge]);
    },
    [nodes.length, setNodes, setEdges]
  );

  /**
   * Handle connections created by users dragging between nodes
   */
  const onConnect: OnConnect = useCallback(
    (params) => {
      console.log(
        `Creating connection from ${params.source} to ${params.target}`
      );
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={proOptions}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      nodeOrigin={nodeOrigin}
      onNodeClick={onNodeClick}
      defaultEdgeOptions={defaultEdgeOptions}
      defaultViewport={{
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        zoom: 0,
      }}
    >
      <Panel position="top-left">
        <b>How to use:</b> Click anywhere on the panel to add nodes, click a
        node to add a connection
      </Panel>
      <Background />
    </ReactFlow>
  );
}

/**
 * Wrapper component providing ReactFlow context
 * @param props Force layout parameters to pass to the main component
 */
function ReactFlowWrapper(props: ExampleProps) {
  console.log("Initializing ReactFlowWrapper with props:", props);
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
