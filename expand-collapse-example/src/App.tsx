import React, { useCallback, useState, MouseEvent } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
  MiniMap,
  Background,
  OnNodesChange,
  OnEdgesChange,
  NodeMouseHandler,
  Node,
  Edge,
} from "reactflow";

import CustomNode from "./CustomNode";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initialElements";
import useAnimatedNodes from "./useAnimatedNodes";
import useExpandCollapse from "./useExpandCollapse";

import "reactflow/dist/style.css";
import styles from "./styles.module.css";

// ReactFlow Pro account configuration to hide attribution
const proOptions = { account: "paid-pro", hideAttribution: true };

// Custom node types mapping
const nodeTypes = {
  custom: CustomNode,
};

/**
 * Props for the ExpandCollapseExample component
 */
type ExpandCollapseExampleProps = {
  treeWidth?: number; // Width between nodes in the tree
  treeHeight?: number; // Height between node layers
  animationDuration?: number; // Duration of node movement animations in ms
};

/**
 * Main ReactFlow component for the expandable/collapsible tree
 * Demonstrates how to create an interactive tree structure with animated expand/collapse
 */
function ReactFlowPro({
  treeWidth = 220,
  treeHeight = 100,
  animationDuration = 300,
}: ExpandCollapseExampleProps = {}) {
  console.log("Rendering ReactFlowPro with", {
    treeWidth,
    treeHeight,
    animationDuration,
  });

  // Initialize state for nodes and edges
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Use custom hook to handle expand/collapse functionality
  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(
    nodes,
    edges,
    { treeWidth, treeHeight }
  );
  console.log(
    `Tree calculated: ${visibleNodes.length} nodes, ${visibleEdges.length} edges visible`
  );

  // Use custom hook to animate node movements
  const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, {
    animationDuration,
  });

  /**
   * Handles changes to nodes (position, selection, etc.)
   */
  const onNodesChange: OnNodesChange = useCallback((changes) => {
    console.log("Node changes:", changes);
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  /**
   * Handles changes to edges
   */
  const onEdgesChange: OnEdgesChange = useCallback((changes) => {
    console.log("Edge changes:", changes);
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  /**
   * Handles node click to toggle expand/collapse state
   */
  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      console.log(
        `Node clicked: ${node.id}, current expand state:`,
        node.data.expanded
      );

      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            // Toggle the expanded state of the clicked node
            const newExpandState = !n.data.expanded;
            console.log(
              `Setting node ${n.id} expanded state to ${newExpandState}`
            );

            return {
              ...n,
              data: { ...n.data, expanded: newExpandState },
            };
          }

          return n;
        })
      );
    },
    [setNodes]
  );

  return (
    <ReactFlow
      fitView
      nodes={animatedNodes}
      edges={visibleEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      className={styles.viewport}
      zoomOnDoubleClick={false}
      elementsSelectable={false}
    >
      <Background />
      <MiniMap />
    </ReactFlow>
  );
}

/**
 * Wrapper component that provides ReactFlow context
 * @param props Component props to pass to the ReactFlowPro component
 */
function ReactFlowWrapper(props: ExpandCollapseExampleProps) {
  console.log("Initializing ReactFlowWrapper with props:", props);
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
