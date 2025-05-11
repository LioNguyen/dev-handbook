import { Background, Panel, ReactFlow, Node } from "@xyflow/react";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback } from "react";

import { useCanvas } from "@/domains/canvas";
import { useCanvasHandlers } from "@/domains/canvas/hooks/handlers";
import "@xyflow/react/dist/style.css";
import AddNode from "./AddNode";
import CustomNode from "./CustomNode";
import RootNode from "./RootNode";
import "./styles.css";

// Custom node types mapping
const nodeTypes = {
  custom: CustomNode,
  root: RootNode,
  add: AddNode,
};

/**
 * Main Canvas component for the tree
 */
function Canvas() {
  // Get state and functions from context
  const { nodes, edges, triggerLayout, setReactFlowInstance, reactFlowInstance } = useCanvas();

  const isNodeDragging = reactFlowInstance?.isNodeDragging();

  // Get handlers
  const {
    onNodesChange,
    onEdgesChange,
    handleNodeDragStart,
    handleNodeDrag,
    handleNodeDragStop,
    createNode,
    handleNodesDelete,
  } = useCanvasHandlers();

  // Handle double click on canvas to create a new node
  const handlePaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      if (!reactFlowInstance) return;

      // Convert screen coordinates to flow coordinates
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create a standalone node at that position
      createNode({ position });
    },
    [createNode, reactFlowInstance],
  );

  // Handle keyboard deletion
  const onNodesDelete = useCallback(
    (nodes: Node[]) => {
      handleNodesDelete(nodes.map((node) => node.id));
    },
    [handleNodesDelete],
  );

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        className="bg-slate-800!"
        fitView
        nodes={nodes}
        edges={edges}
        elementsSelectable={true}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        nodesConnectable={false}
        panOnDrag={!isNodeDragging}
        proOptions={{ hideAttribution: true }}
        selectNodesOnDrag={false}
        zoomOnDoubleClick={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={setReactFlowInstance}
        onNodeDragStart={handleNodeDragStart}
        onNodeDrag={handleNodeDrag}
        onNodeDragStop={handleNodeDragStop}
        onNodeDoubleClick={(e) => {
          e.stopPropagation();
        }}
        onDoubleClick={handlePaneDoubleClick}
        onNodesDelete={onNodesDelete}
        onPaneClick={() => {
          reactFlowInstance?.selectNodes([""]);
        }}
      >
        <Panel position="top-left" className="bg-white rounded-lg shadow-md p-2 m-4">
          <div className="flex space-x-2">
            <button
              className="p-1.5 rounded hover:bg-gray-100"
              onClick={() => reactFlowInstance?.zoomIn()}
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <button
              className="p-1.5 rounded hover:bg-gray-100"
              onClick={() => reactFlowInstance?.zoomOut()}
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              className="p-1.5 rounded hover:bg-gray-100"
              onClick={() => {
                triggerLayout();
              }}
              title="Auto Layout"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </Panel>

        {/* Debug panel to show drag status - can be removed when everything works */}
        <Panel position="bottom-left" className="bg-white rounded-lg shadow-md p-2 m-4 text-xs">
          <div>
            <p>Total nodes: {nodes.length}</p>
            <p>Double-click on empty space to create a node</p>
          </div>
        </Panel>

        <Background color="#ccc" gap={16} />
      </ReactFlow>
    </div>
  );
}

export default Canvas;
