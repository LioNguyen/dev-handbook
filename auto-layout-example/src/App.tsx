import React, {
  useEffect,
  useState,
  MouseEvent,
  DragEvent,
  DragEventHandler,
} from "react";
import ReactFlow, {
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
  Node,
  Edge,
  NodeTypes,
  OnNodesChange,
  applyNodeChanges,
  NodeMouseHandler,
  NodeChange,
  OnEdgesChange,
  EdgeChange,
  applyEdgeChanges,
} from "reactflow";

import Sidebar from "./Sidebar";
import CustomNode from "./CustomNode";
import useAutoLayout, { Direction } from "./useAutoLayout";
import * as initialElements from "./initialElements";

import "reactflow/dist/style.css";
import styles from "./styles.module.css";

// Define custom node types that will be used in the flow
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

// Pro account configuration to hide attribution
const proOptions = {
  account: "paid-pro",
  hideAttribution: true,
};

// Default configuration for new edges
const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 5 },
};

type ExampleProps = {
  direction?: Direction;
};

type NodeData = {
  label: string;
};

/**
 * ReactFlowPro component - Main component for automatic node arrangement
 * This component demonstrates how to automatically arrange nodes after adding children to the graph
 */
function ReactFlowPro({ direction = "TB" }: ExampleProps) {
  const { fitView } = useReactFlow();

  // Use custom hook for automatic layout based on direction
  useAutoLayout({ direction });

  // State for nodes and edges
  const [nodes, setNodes] = useState<Node<NodeData>[]>(initialElements.nodes);
  const [edges, setEdges] = useState<Edge[]>(initialElements.edges);

  /**
   * Creates a new connection from the source node to a new target node
   * @param sourceId ID of the source node
   */
  const createConnection = (sourceId: string) => {
    console.log("Creating connection from node:", sourceId);

    // Create incremental ID based on number of existing nodes
    const targetId: string = `${nodes.length + 1}`;

    // Create new target node
    const targetNode: Node<NodeData> = {
      id: targetId,
      data: { label: `Node ${targetId}` },
      // Position will be computed by layout hook
      position: { x: 0, y: 0 },
      type: "custom",
      style: { opacity: 0 },
    };

    // Create edge connecting source to new target
    const connectingEdge: Edge = {
      id: `${sourceId}->${targetId}`,
      source: sourceId,
      target: targetId,
      style: { opacity: 0 },
    };

    console.log("Adding new node:", targetNode);
    console.log("Adding new edge:", connectingEdge);

    setNodes((nodes) => nodes.concat([targetNode]));
    setEdges((edges) => edges.concat([connectingEdge]));
  };

  /**
   * Handles drop events when a node is dragged from sidebar onto an existing node
   * @param evt Drag event object
   */
  const onDrop: DragEventHandler = (evt: DragEvent<HTMLDivElement>) => {
    console.log("Drop event detected");

    // Ensure target is a DOM element
    if (evt.target instanceof Element) {
      // Find the closest node wrapper element with a data-id attribute
      const targetId = evt.target
        .closest(".react-flow__node")
        ?.getAttribute("data-id");

      if (targetId) {
        console.log("Drop target identified:", targetId);
        createConnection(targetId);
      } else {
        console.log("No valid drop target found");
      }
    }
  };

  /**
   * Handles node click events - adds a new connected node when an existing node is clicked
   * @param _ Mouse event (unused)
   * @param node The clicked node
   */
  const onNodeClick: NodeMouseHandler = (
    _: MouseEvent,
    node: Node<NodeData>
  ) => {
    console.log("Node clicked:", node.id);
    createConnection(node.id);
  };

  /**
   * Applies changes to nodes (position, selection, etc.)
   * @param changes Array of node changes to apply
   */
  const onNodesChange: OnNodesChange = (changes: NodeChange[]) => {
    console.log("Node changes:", changes);
    setNodes((nodes) => applyNodeChanges(changes, nodes));
  };

  /**
   * Applies changes to edges
   * @param changes Array of edge changes to apply
   */
  const onEdgesChange: OnEdgesChange = (changes: EdgeChange[]) => {
    console.log("Edge changes:", changes);
    setEdges((edges) => applyEdgeChanges(changes, edges));
  };

  // Center the graph whenever nodes are updated
  useEffect(() => {
    console.log("Nodes updated, fitting view");
    fitView({ duration: 400 });
  }, [nodes, fitView]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <ReactFlow
        className={styles.reactFlow}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        defaultEdgeOptions={defaultEdgeOptions}
        minZoom={-Infinity}
        maxZoom={Infinity}
      />
    </div>
  );
}

/**
 * ReactFlowWrapper component
 * Wraps the main component with ReactFlowProvider to access internal React Flow state
 */
const ReactFlowWrapper = (props: ExampleProps) => {
  console.log("Initializing ReactFlow with props:", props);
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
};

export default ReactFlowWrapper;
