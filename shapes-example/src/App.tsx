import React from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  ReactFlowProvider,
  ConnectionLineType,
  MarkerType,
  ConnectionMode,
} from "reactflow";

import "reactflow/dist/style.css";

import ShapeNode from "./ShapeNode";

/**
 * Custom node types mapping
 * Registers our ShapeNode component for creating various diagram shapes
 */
const nodeTypes = {
  shape: ShapeNode,
};

/**
 * Initial nodes configuration
 * Defines various shapes with different properties (position, dimensions, color)
 */
const defaultNodes: Node[] = [
  {
    id: "1",
    type: "shape",
    position: { x: 0, y: 0 },
    data: {
      shape: "round-rect",
      width: 150,
      height: 50,
      label: "Round Rectangle",
      color: "#668de3",
    },
  },
  {
    id: "2",
    type: "shape",
    position: { x: 25, y: 120 },
    data: {
      shape: "diamond",
      width: 100,
      height: 100,
      label: "Diamond",
      color: "#ff6700",
    },
  },
  {
    id: "3",
    type: "shape",
    position: { x: -150, y: 135 },
    data: {
      shape: "circle",
      width: 70,
      height: 70,
      label: "Circle",
      color: "#6ede87",
    },
  },
  {
    id: "4",
    type: "shape",
    position: { x: 220, y: 145 },
    data: {
      shape: "circle",
      width: 150,
      height: 50,
      label: "Ellipse",
      color: "#ff0072",
    },
  },
  {
    id: "5",
    type: "shape",
    position: { x: 380, y: 280 },
    data: {
      shape: "hexagon",
      width: 120,
      height: 60,
      label: "Hexagon",
      color: "#00d7ca",
    },
  },
  {
    id: "6",
    type: "shape",
    position: { x: -250, y: 310 },
    data: {
      shape: "arrow-rect",
      width: 130,
      height: 50,
      label: "Arrow Rectangle",
      color: "#784be8",
    },
  },
  {
    id: "7",
    type: "shape",
    position: { x: 15, y: 350 },
    data: {
      shape: "database",
      width: 100,
      height: 80,
      label: "Database",
      color: "#9ca8b3",
    },
  },
  {
    id: "8",
    type: "shape",
    position: { x: 15, y: 500 },
    data: {
      shape: "triangle",
      width: 100,
      height: 70,
      label: <div style={{ marginTop: 30 }}>Triangle</div>,
      color: "#ff6700",
    },
  },
  {
    id: "9",
    type: "shape",
    position: { x: 200, y: 390 },
    data: {
      shape: "parallelogram",
      width: 150,
      height: 70,
      label: "Parallelogram",
      color: "#668de3",
    },
  },
];

/**
 * Default edge styling and behavior
 * Uses smooth step edges with arrow markers
 */
const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { strokeWidth: 2 },
};

/**
 * Initial edges configuration
 * Connects the shape nodes to create a complete diagram
 * Some edges include labels and specific source/target handles
 */
const defaultEdges: Edge[] = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "2->3",
    source: "2",
    target: "3",
    label: "no",
    sourceHandle: "left",
    targetHandle: "right",
  },
  {
    id: "2->4",
    source: "2",
    target: "4",
    label: "yes",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "4->5",
    source: "4",
    target: "5",
    sourceHandle: "right",
    targetHandle: "top",
  },
  {
    id: "3->6",
    source: "3",
    target: "6",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "6->7",
    source: "6",
    target: "7",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "4->7",
    source: "4",
    target: "7",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "7->8",
    source: "7",
    target: "8",
    sourceHandle: "bottom",
    targetHandle: "top",
  },
  {
    id: "5->9",
    source: "5",
    target: "9",
    sourceHandle: "left",
    targetHandle: "top",
  },
];

/**
 * ReactFlow Pro options to disable attribution watermark
 */
const proOptions = { account: "paid-pro", hideAttribution: true };

/**
 * ReactFlowPro Component
 *
 * Demonstrates various shape nodes connected in a flowchart-like diagram
 * Shows how to use custom node types and handle-specific connections
 *
 * @param {Object} props - Component props
 * @param {string} props.backgroundColor - Background color for the diagram
 * @returns {JSX.Element} ReactFlow component with shape nodes
 */
function ReactFlowPro({ backgroundColor = "#1a202c" }) {
  console.log(
    "Rendering ReactFlowPro component with background:",
    backgroundColor
  );
  console.log(
    `Initializing diagram with ${defaultNodes.length} nodes and ${defaultEdges.length} edges`
  );

  return (
    <ReactFlow
      style={{ backgroundColor }}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.SmoothStep}
      connectionMode={ConnectionMode.Loose}
      fitView
      onInit={(reactFlowInstance) => {
        console.log("ReactFlow instance initialized");
        console.log("Viewport initialized:", reactFlowInstance.getViewport());
      }}
      onNodeClick={(_, node) => {
        console.log(`Node clicked: ${node.id}`, node);
      }}
      onEdgeClick={(_, edge) => {
        console.log(`Edge clicked: ${edge.id}`, edge);
      }}
      onConnect={(params) => {
        console.log("New connection created:", params);
      }}
    >
      <Background />
    </ReactFlow>
  );
}

/**
 * ReactFlowWrapper Component
 *
 * Wraps the main component with ReactFlowProvider to ensure
 * proper context access throughout the component tree
 *
 * @param {Object} props - Props to pass to the ReactFlowPro component
 * @returns {JSX.Element} Wrapped ReactFlow component
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
