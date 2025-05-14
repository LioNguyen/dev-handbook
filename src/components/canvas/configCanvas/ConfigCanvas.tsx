import { Background, Node, Panel, ReactFlow } from "@xyflow/react";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { useCanvas } from "@/domains/canvas";
import { useCanvasHandlers } from "@/domains/canvas/hooks/handlers";
import "@xyflow/react/dist/style.css";
import NodeDetailSheet from "./NodeDetailSheet";
import AddNode from "./AddNode";
import CustomNode from "./CustomNode";
import RootNode from "./RootNode";
import "../styles.css";
import { ConfigCanvasProvider } from "@/domains/canvas/ConfigCanvas.provider";

function ConfigCanvas() {
  // Get state and functions from context
  const { nodes, edges, triggerLayout, setReactFlowInstance, reactFlowInstance } = useCanvas();

  // State for node detail sheet
  const [nodeDetailSheetOpen, setNodeDetailSheetOpen] = useState(false);
  const [nodeDetailPosition, setNodeDetailPosition] = useState<{ x: number; y: number } | undefined>();
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();

  const isNodeDragging = reactFlowInstance?.isNodeDragging();

  // Get handlers
  const { onNodesChange, onEdgesChange, handleNodeDragStart, handleNodeDrag, handleNodeDragStop, handleNodesDelete } =
    useCanvasHandlers();

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
      handleNodesDelete(nodes.map((node) => node.id));
    },
    [handleNodesDelete],
  );

  // Add the action handler to each node's data
  const nodesWithActions = useMemo(() => {
    return nodes.map((node) => {
      if (node.type === "custom") {
        return {
          ...node,
          data: {
            ...node.data,
            onEditNode: handleOpenNodeEditSheet,
          },
        };
      }
      return node;
    });
  }, [nodes, handleOpenNodeEditSheet]);

  // Custom node types mapping
  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
      root: RootNode,
      add: AddNode,
    }),
    [],
  );

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        className="bg-slate-800!"
        fitView
        nodes={nodesWithActions}
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
        onNodeDoubleClick={handleNodeDoubleClick}
        onDoubleClick={handlePaneDoubleClick}
        onNodesDelete={onNodesDelete}
        onPaneClick={() => {
          reactFlowInstance?.selectNodes([""]);
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
