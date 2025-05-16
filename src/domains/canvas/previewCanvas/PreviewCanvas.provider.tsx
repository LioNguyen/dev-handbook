import { ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";

import useAutoLayout from "../hooks/useAutoLayout";
import { Provider } from "./PreviewCanvas.context";
import { usePreviewCanvasService } from "./PreviewCanvas.services";

const keyToRender = {
  node: ["parentLead", "parentLeadValue", "parentLeadType", "value"],
  leaf: {
    node: ["sessionId", "time", "operation"],
    leaf: {
      node: ["additionalDetails", "conditionalAccessStatus", "", "failureReason", "status"],
      leaf: {
        node: ["additionalDetails"],
        leaf: {
          node: ["additionalDetails", "conditionalAccessStatus"],
          leaf: {
            node: ["additionalDetails", "conditionalAccessStatus", "errorCode", "failureReason", "status"],
          },
        },
      },
    },
  },
};

// Canvas provider component that uses ReactFlow hooks
const CanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial data
  const canvasService = usePreviewCanvasService();
  const initialNodes = useMemo(
    () => canvasService.getNodesAndEdgesFromData(keyToRender as any)?.nodes,
    [canvasService],
  );
  const initialEdges = useMemo(
    () => canvasService.getNodesAndEdgesFromData(keyToRender as any)?.edges,
    [canvasService],
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
