import { ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { isEqual } from "lodash";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";

import { usePrevious } from "@/core/utils";
import { useCanvas } from "../canvas.context";
import canvasData from "../data/canvas.json";
import useAutoLayout from "../hooks/useAutoLayout";
import { generateNodesAndEdges } from "../utils/dataUtils";
import { Provider } from "./PreviewCanvas.context";

// Canvas provider component that uses ReactFlow hooks
const CanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial data
  const { previewCanvasKey } = useCanvas();
  const previousPreviewCanvasKey = usePrevious(previewCanvasKey);

  const initialNodes = useMemo(
    () => generateNodesAndEdges(canvasData, previewCanvasKey as any)?.nodes,
    [previewCanvasKey],
  );
  const initialEdges = useMemo(
    () => generateNodesAndEdges(canvasData, previewCanvasKey as any)?.edges,
    [previewCanvasKey],
  );

  // Use React Flow's node and edge state hooks
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useReactFlow();

  // Canvas settings
  const [canvasSettings, setCanvasSettings] = useState({
    treeWidth: 400,
    treeHeight: 100,
    animationDuration: 200,
    direction: "LR" as "TB" | "LR" | "RL" | "BT",
  });

  const { triggerLayout } = useAutoLayout();

  useEffect(() => {
    triggerLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEqual(previousPreviewCanvasKey, previewCanvasKey)) {
      setNodes(initialNodes);
      setEdges(initialEdges);
      triggerLayout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewCanvasKey]);

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
const PreviewCanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReactFlowProvider>
      <CanvasProvider>{children}</CanvasProvider>
    </ReactFlowProvider>
  );
};

export { PreviewCanvasProvider };
