// src/components/canvas/MainCanvas.tsx
import { Background, Node, Panel, ReactFlow } from "@xyflow/react";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useState } from "react";

import { useConfigCanvas } from "@/domains/canvas/configCanvas/ConfigCanvas.context";
import { ConfigCanvasProvider } from "@/domains/canvas/configCanvas/ConfigCanvas.provider";
import { useIsNodeDragging, useSelectNodes } from "@/domains/canvas/configCanvas/hooks/canvasHandlers";
import { useChangeHandlers } from "@/domains/canvas/configCanvas/hooks/changeHandlers";
import { useNodeDragHandlers } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useNodeDragHandlers";
import { useNodesDelete } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useNodesDelete";
import "@xyflow/react/dist/style.css";
import "../styles.css";
import AddNode from "./AddNode";
import CustomNode from "./CustomNode";
import NodeDetailSheet from "./NodeDetailSheet";
import RootNode from "./RootNode";

// Custom node types mapping
const nodeTypes = {
  custom: CustomNode,
  root: RootNode,
  add: AddNode,
};

function ConfigCanvas() {
  // Get state and functions from context
  const { nodes, edges, reactFlowInstance, triggerLayout } = useConfigCanvas();

  // State for node detail sheet
  const [nodeDetailSheetOpen, setNodeDetailSheetOpen] = useState(false);
  const [nodeDetailPosition, setNodeDetailPosition] = useState<{ x: number; y: number } | undefined>();
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();

  const isNodeDragging = useIsNodeDragging();

  // Get handlers
  const { handleNodeDragStart, handleNodeDrag, handleNodeDragStop } = useNodeDragHandlers();
  const { onNodesChange, onEdgesChange } = useChangeHandlers();
  const deleteNodes = useNodesDelete();
  const selectNodes = useSelectNodes();

  // Handle opening the edit sheet for a node
  const handleOpenNodeEditSheet = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    setNodeDetailPosition(undefined);
    setNodeDetailSheetOpen(true);
  }, []);

  // Handle double click on canvas to create a new node
  const handlePaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      if (!reactFlowInstance) return;

      // Convert screen coordinates to flow coordinates
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Open the detail sheet with the clicked position
      setNodeDetailPosition(position);
      setSelectedNodeId(undefined);
      setNodeDetailSheetOpen(true);
    },
    [reactFlowInstance],
  );

  // Handle node double click to edit
  const handleNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();
      handleOpenNodeEditSheet(node.id);
    },
    [handleOpenNodeEditSheet],
  );

  // Handle keyboard deletion
  const onNodesDelete = useCallback(
    (nodes: Node[]) => {
      deleteNodes(nodes.map((node) => node.id));
    },
    [deleteNodes],
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
        zoomOnDoubleClick={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStart={handleNodeDragStart}
        onNodeDrag={handleNodeDrag}
        onNodeDragStop={handleNodeDragStop}
        onNodeDoubleClick={handleNodeDoubleClick}
        onDoubleClick={handlePaneDoubleClick}
        onNodesDelete={onNodesDelete}
        onPaneClick={() => {
          selectNodes([""]);
        }}
        minZoom={0}
        maxZoom={Infinity}
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
            <p>Double-click on a node to edit it</p>
          </div>
        </Panel>

        <Background color="#ccc" gap={16} />
      </ReactFlow>

      {/* Node detail sheet for creating/editing standalone nodes */}
      <NodeDetailSheet
        open={nodeDetailSheetOpen}
        onOpenChange={setNodeDetailSheetOpen}
        position={nodeDetailPosition}
        nodeId={selectedNodeId}
      />
    </div>
  );
}

const ConfigCanvasWrapper = () => {
  return (
    <ConfigCanvasProvider>
      <ConfigCanvas />
    </ConfigCanvasProvider>
  );
};

export default ConfigCanvasWrapper;
