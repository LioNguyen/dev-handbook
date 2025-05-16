import { Edge, Node, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { isEqual } from "lodash";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";

import { useCanvas } from "../canvas.context";
import useAutoLayout from "../hooks/useAutoLayout";
import { createKeyToRender } from "../utils/dataUtils";
import { Provider } from "./ConfigCanvas.context";

// Canvas provider component that uses ReactFlow hooks
const CanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { previewCanvasKey, setPreviewCanvasKey } = useCanvas();

  // Use React Flow's node and edge state hooks
  const initialNode = [
    {
      id: "1",
      type: "root", // Keep node type for React Flow
      draggable: false,
      position: { x: 0, y: 0 },
      data: {},
    },
  ] as Node[];
  const initialEdge = [] as Edge[];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdge);
  const reactFlowInstance = useReactFlow();

  // Canvas settings
  const [canvasSettings, setCanvasSettings] = useState({
    treeWidth: 400,
    treeHeight: 100,
    animationDuration: 200,
    direction: "LR" as "TB" | "LR" | "RL" | "BT",
  });

  const { triggerLayout } = useAutoLayout({
    nodeWidth: 400,
    nodeHeight: 100,
  });

  useEffect(() => {
    triggerLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keyToRender = createKeyToRender(nodes, edges);
    if (!isEqual(previewCanvasKey, keyToRender)) {
      setPreviewCanvasKey(keyToRender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => {
    return {
      reactFlowInstance,

      // States
      nodes,
      setNodes,
      edges,
      setEdges,
      onNodesChange,
      onEdgesChange,
      canvasSettings,
      setCanvasSettings,

      triggerLayout,
    };
  }, [
    reactFlowInstance,
    nodes,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    canvasSettings,
    setCanvasSettings,
    triggerLayout,
  ]);

  return <Provider value={value}>{children}</Provider>;
};

// Export the wrapped provider with ReactFlow
const ConfigCanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReactFlowProvider>
      <CanvasProvider>{children}</CanvasProvider>
    </ReactFlowProvider>
  );
};

export { ConfigCanvasProvider };
