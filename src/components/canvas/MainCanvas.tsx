// src/components/canvas/index.tsx
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import ReactFlow, { Background, Panel, ReactFlowInstance } from "reactflow";

import { useCanvas } from "@/domains/canvas";
import { useCanvasHandlers } from "@/domains/canvas/hooks/handlers";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import RootNode from "./RootNode";
import "./styles.css";

// Custom node types mapping
const nodeTypes = {
  custom: CustomNode,
  root: RootNode,
};

/**
 * Props for the Canvas component
 */
// type CanvasProps = {
//   treeWidth?: number; // Width between nodes in the tree
//   treeHeight?: number; // Height between node layers
//   animationDuration?: number; // Duration of node movement animations in ms
//   direction?: "TB" | "LR" | "RL" | "BT"; // Direction of the tree layout
// };

/**
 * Main Canvas component for the expandable/collapsible tree
 */
function Canvas() {
  // Get state and functions from context
  const { animatedNodes, visibleEdges, highlightedNodeId, highlightedNodes, highlightedEdges, setReactFlowInstance } =
    useCanvas();

  // Get handlers
  const { onNodesChange, onEdgesChange, toggleNodeExpansion, onPaneClick, zoomIn, zoomOut, fitView, highlightNodes } =
    useCanvasHandlers();

  // Track the number of visible nodes to detect changes
  const visibleNodesCountRef = useRef(0);

  // Effect to fit view when nodes change
  useEffect(() => {
    if (animatedNodes.length > 0 && visibleNodesCountRef.current !== animatedNodes.length) {
      visibleNodesCountRef.current = animatedNodes.length;

      // Fit view after a short delay to allow React Flow to update
      setTimeout(() => {
        fitView?.();
      }, 50);
    }
  }, [animatedNodes.length, fitView]);

  // Add handler functions and highlighting to node data
  const nodesWithHandlers = animatedNodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      toggleNodeExpansion,
      highlightNodes,
      highlightedNodeId,
    },
    // Add a class to highlight children
    className: highlightedNodes.has(node.id) && node.id !== highlightedNodeId ? "child-highlighted" : "",
  }));

  // Add highlighting to edges
  const highlightedVisibleEdges = visibleEdges.map((edge) => ({
    ...edge,
    className: highlightedEdges.has(edge.id) ? "highlighted-edge" : "",
    animated: highlightedEdges.has(edge.id),
    style: highlightedEdges.has(edge.id) ? { stroke: "#ec4899", strokeWidth: 2 } : undefined,
  }));

  // Handle init to save the ReactFlow instance
  // Fixed type for instance parameter
  const onInit = useCallback(
    (instance: ReactFlowInstance) => {
      setReactFlowInstance(instance);
    },
    [setReactFlowInstance],
  );

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        className="bg-slate-800"
        fitView
        nodes={nodesWithHandlers}
        edges={highlightedVisibleEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={onPaneClick}
        onInit={onInit}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnDoubleClick={false}
        elementsSelectable={true}
        proOptions={{ hideAttribution: true }}
      >
        <Panel position="top-left" className="bg-white rounded-lg shadow-md p-2 m-4">
          <div className="flex space-x-2">
            <button className="p-1.5 rounded hover:bg-gray-100" onClick={zoomIn} title="Zoom In">
              <ZoomIn size={18} />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100" onClick={zoomOut} title="Zoom Out">
              <ZoomOut size={18} />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100" onClick={fitView} title="Fit View">
              <RotateCcw size={18} />
            </button>
          </div>
        </Panel>

        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default Canvas;
