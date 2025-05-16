// src/domains/canvas/canvas.provider.tsx
import { ReactFlowInstance, ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { Provider } from "./canvas.context";
import { useCanvasService } from "./canvas.services";
import useAutoLayout from "./hooks/useAutoLayout";
import { applyEdgesStyles, applyNodesStyles } from "./utils";
import { ExtendedReactFlowInstance, extendReactFlowInstance } from "./utils/extendedFlowInstance";

// Canvas provider component that uses ReactFlow hooks
const MainCanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state for nodes and edges
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [extendedInstance, setExtendedInstance] = useState<ExtendedReactFlowInstance | null>(null);
  const [keyToRender, setkeyToRender] = useState({
    domainId: false,
    parentLead: true,
    parentLeadValue: true,
    parentLeadType: true,
    value: true,
    result: {
      sessionId: false,
      time: true,
      operation: false,
      result: {
        additionalDetails: false,
        conditionalAccessStatus: true,
        errorCode: true,
        failureReason: true,
        status: true,
        result: {
          additionalDetails: true,
          conditionalAccessStatus: true,
          errorCode: true,
          failureReason: true,
          status: true,
          result: {
            additionalDetails: true,
            conditionalAccessStatus: true,
            errorCode: true,
            failureReason: true,
            status: true,
            result: {
              additionalDetails: true,
              conditionalAccessStatus: true,
              errorCode: true,
              failureReason: true,
              status: true,
              result: {
                additionalDetails: true,
                conditionalAccessStatus: true,
                errorCode: true,
                failureReason: true,
                status: true,
              },
            },
          },
        },
      },
    },
  });

  // Get initial data
  const canvasService = useCanvasService();
  const initialNodes = useMemo(
    () => canvasService.getNodesAndEdgesFromData(keyToRender)?.nodes,
    [canvasService, keyToRender],
  );
  const initialEdges = useMemo(
    () => canvasService.getNodesAndEdgesFromData(keyToRender)?.edges,
    [canvasService, keyToRender],
  );

  // Use React Flow's node and edge state hooks
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const isNodeDragging = nodes.some((node) => node.dragging);

  // Canvas settings
  const [canvasSettings, setCanvasSettings] = useState({
    treeWidth: 400,
    treeHeight: 100,
    animationDuration: 200,
    direction: "LR" as "TB" | "LR" | "RL" | "BT",
  });

  // Use auto layout hook
  const { triggerLayout } = useAutoLayout({
    direction: canvasSettings.direction,
    nodeWidth: canvasSettings.treeWidth,
    nodeHeight: canvasSettings.treeHeight,
    animationDuration: canvasSettings.animationDuration,
  });

  // const { nodes: animatedNodes } = useAnimatedNodes(nodes);

  // Use animated nodes hook, but only if we're not dragging
  // Get enhanced nodes and edges with selection information
  const styledNodes = applyNodesStyles(nodes, edges, extendedInstance);
  const styledEdges = applyEdgesStyles(nodes, edges, extendedInstance);

  // Handle instance initialization
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  useEffect(() => {
    if (reactFlowInstance) {
      setExtendedInstance(extendReactFlowInstance(reactFlowInstance));
    }
  }, [reactFlowInstance]);

  // TODO: Track actions and trigger layout when needed
  useEffect(() => {
    if (isNodeDragging) return;

    triggerLayout();
  }, [reactFlowInstance]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => {
    return {
      ...canvasService,

      // States
      nodes: styledNodes,
      setNodes,
      edges: styledEdges,
      setEdges,
      onNodesChange,
      onEdgesChange,
      reactFlowInstance: extendedInstance,
      setReactFlowInstance: onInit,
      canvasSettings,
      setCanvasSettings,

      // Functions
      triggerLayout,

      // Derived states
      visibleNodes: nodes,
      visibleEdges: edges,
      animatedNodes: nodes,
    };
  }, [
    canvasService,
    nodes,
    setNodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onInit,
    extendedInstance,
    canvasSettings,
    setCanvasSettings,
    styledNodes,
    styledEdges,
    triggerLayout,
  ]);

  return <Provider value={value}>{children}</Provider>;
};

// Export the wrapped provider with ReactFlow
const CanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReactFlowProvider>
      <MainCanvasProvider>{children}</MainCanvasProvider>
    </ReactFlowProvider>
  );
};

export { CanvasProvider };
