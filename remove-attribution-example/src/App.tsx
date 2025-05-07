import React from "react";
import ReactFlow, { Background } from "reactflow";

import "reactflow/dist/style.css";

import { nodes, edges } from "./initialElements";

/**
 * ReactFlowPro Component
 *
 * This example demonstrates how to remove the attribution watermark from
 * the React Flow renderer when using a Pro or Enterprise license.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.hideAttribution - Whether to hide the attribution watermark (default: true)
 * @returns {JSX.Element} ReactFlow component with attribution optionally hidden
 */
function ReactFlowPro({ hideAttribution = true }) {
  console.log(
    "Rendering ReactFlowPro component with attribution hidden:",
    hideAttribution
  );
  console.log(
    `Initializing with ${nodes.length} nodes and ${edges.length} edges`
  );

  // Configure the pro options for ReactFlow
  const proOptions = {
    // The 'account' property enables premium features based on your license type
    // For versions < 10.2 you can use account: 'paid-enterprise'
    account: "paid-pro",

    // When combined with a valid account property, hideAttribution: true
    // will remove the ReactFlow attribution watermark from the canvas
    hideAttribution,
  };

  console.log("Pro options configured:", proOptions);

  return (
    <ReactFlow
      proOptions={proOptions}
      defaultNodes={nodes}
      defaultEdges={edges}
      fitView
      onInit={(reactFlowInstance) => {
        console.log("ReactFlow initialized", reactFlowInstance);
      }}
      onNodesChange={(changes) => {
        console.log("Nodes changed:", changes);
      }}
      onEdgesChange={(changes) => {
        console.log("Edges changed:", changes);
      }}
    >
      <Background />
    </ReactFlow>
  );
}

export default ReactFlowPro;
