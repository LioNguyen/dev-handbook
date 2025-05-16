import { Background, Node, Panel, ReactFlow } from "@xyflow/react";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback } from "react";

import { useConfigCanvas } from "@/domains/canvas/configCanvas/ConfigCanvas.context";
import { ConfigCanvasProvider } from "@/domains/canvas/configCanvas/ConfigCanvas.provider";
import { useSelectNodes } from "@/domains/canvas/configCanvas/hooks/canvasHandlers";
import { useChangeHandlers } from "@/domains/canvas/configCanvas/hooks/changeHandlers";
import { useNodesDelete } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useNodesDelete";
import "@xyflow/react/dist/style.css";
import "../styles.css";
import AddNode from "./AddNode";
import CustomNode from "./CustomNode";
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

  // Get handlers
  const { onNodesChange, onEdgesChange } = useChangeHandlers();
  const deleteNodes = useNodesDelete();
  const selectNodes = useSelectNodes();

  // Handle keyboard deletion - only for nodes
  const onNodesDelete = useCallback(
    (nodes: Node[]) => {
      deleteNodes(nodes.map((node) => node.id));
    },
    [deleteNodes],
  );

  // Prevent edge deletion when Delete key is pressed
  // This is a no-op function to override the default behavior
  const onEdgesDelete = useCallback(() => {
    // Do nothing - prevents edge deletion
    return;
  }, []);

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
        edgesFocusable={false} // Disable edge focusing
        panOnDrag={true}
        proOptions={{ hideAttribution: true }}
        zoomOnDoubleClick={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange} // Use our custom edge change handler
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete} // Add edge deletion prevention
        onPaneClick={() => {
          selectNodes([""]);
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
            <p>Double-click on a node to edit it</p>
          </div>
        </Panel>

        <Background color="#ccc" gap={16} />
      </ReactFlow>
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
