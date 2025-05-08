// src/components/canvas/MainCanvas.tsx
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { Background, Panel, ReactFlowInstance, useReactFlow } from "reactflow";

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
 * Main Canvas component for the expandable/collapsible tree
 */
function Canvas() {
  const [isDraggingNode, setIsDraggingNode] = useState(false);

  // Get state and functions from context
  const { animatedNodes, visibleEdges, highlightedNodeId, highlightedNodes, highlightedEdges, setReactFlowInstance } =
    useCanvas();

  // Get handlers
  const {
    onNodesChange,
    onEdgesChange,
    toggleNodeExpansion,
    onPaneClick,
    zoomIn,
    zoomOut,
    fitView,
    highlightNodes,
    handleNodeDragStart,
    handleNodeDrag,
    handleNodeDragStop,
    createStandaloneNode,
  } = useCanvasHandlers();

  // Get ReactFlow utility functions
  const { screenToFlowPosition } = useReactFlow();

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
    draggable: true, // Enable dragging for all nodes
    data: {
      ...node.data,
      toggleNodeExpansion,
      highlightNodes,
      highlightedNodeId,
    },
    // Add a class for highlighting or drop targets
    className:
      highlightedNodes.has(node.id) && node.id !== highlightedNodeId
        ? "child-highlighted"
        : node.data?.isDropTarget
        ? "drop-target"
        : node.data?.isDragging
        ? "dragging"
        : "",
  }));

  // Add highlighting to edges
  const highlightedVisibleEdges = visibleEdges.map((edge) => ({
    ...edge,
    className: highlightedEdges.has(edge.id) ? "highlighted-edge" : "",
    animated: highlightedEdges.has(edge.id),
    style: highlightedEdges.has(edge.id) ? { stroke: "#ec4899", strokeWidth: 2 } : undefined,
  }));

  // Handle init to save the ReactFlow instance
  const onInit = useCallback(
    (instance: ReactFlowInstance) => {
      setReactFlowInstance(instance);
    },
    [setReactFlowInstance],
  );

  // Handle double click on canvas to create a new node
  const handlePaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      // Convert screen coordinates to flow coordinates
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create a standalone node at that position
      createStandaloneNode(position);
    },
    [createStandaloneNode, screenToFlowPosition],
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
        onNodeDragStart={(e, node) => {
          setIsDraggingNode(true);
          handleNodeDragStart(e, node);
        }}
        onNodeDrag={handleNodeDrag}
        onNodeDragStop={(e, node) => {
          setIsDraggingNode(false);
          handleNodeDragStop(e, node);
        }}
        onNodeDoubleClick={(e) => {
          e.stopPropagation();
        }}
        onDoubleClick={handlePaneDoubleClick}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        nodesConnectable={false}
        zoomOnDoubleClick={false}
        elementsSelectable={true}
        proOptions={{ hideAttribution: true }}
        panOnDrag={!isDraggingNode}
      >
        <Panel position="top-left" className="bg-white rounded-lg shadow-md p-2 m-4">
          <div className="flex space-x-2">
            <button className="p-1.5 rounded hover:bg-gray-100" onClick={zoomIn} title="Zoom In">
              <ZoomIn size={18} />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100" onClick={zoomOut} title="Zoom Out">
              <ZoomOut size={18} />
            </button>
            <button className="p-1.5 rounded hover:bg-gray-100" onClick={fitView} title="Auto Layout">
              <RotateCcw size={18} />
            </button>
          </div>
        </Panel>

        {/* Debug panel to show drag status - can be removed when everything works */}
        <Panel position="bottom-left" className="bg-white rounded-lg shadow-md p-2 m-4 text-xs">
          <div>
            <p>Total nodes: {animatedNodes.length}</p>
            <p>Draggable nodes: {animatedNodes.filter((n) => n.draggable).length}</p>
            <p>Dragging nodes: {animatedNodes.filter((n) => n.dragging).length}</p>
            <p>Double-click on empty space to create a node</p>
          </div>
        </Panel>

        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default Canvas;
