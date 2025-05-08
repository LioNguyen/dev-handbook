// src/domains/canvas/canvas.provider.tsx
import { FC, ReactNode, useMemo, useState } from "react";
import { Edge, Node, ReactFlowInstance, ReactFlowProvider } from "reactflow";

import { Provider } from "./canvas.context";
import { useCanvasService } from "./canvas.services";
import useAnimatedNodes from "./hooks/useAnimatedNodes";
import useExpandCollapse from "./hooks/useExpandCollapse";

const MainCanvasProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Get canvas service
  const canvasService = useCanvasService();

  // Initialize state for nodes and edges
  const [nodes, setNodes] = useState<Node[]>(canvasService.getInitialNodes());
  const [edges, setEdges] = useState<Edge[]>(canvasService.getInitialEdges());
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [highlightedEdges, setHighlightedEdges] = useState<Set<string>>(new Set());
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  // Canvas settings
  const [canvasSettings, setCanvasSettings] = useState({
    treeWidth: 400,
    treeHeight: 100,
    animationDuration: 300,
    direction: "LR" as "TB" | "LR" | "RL" | "BT",
  });

  // Use custom hooks for layout and animation
  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(nodes, edges, {
    treeWidth: canvasSettings.treeWidth,
    treeHeight: canvasSettings.treeHeight,
    direction: canvasSettings.direction,
  });

  const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, {
    animationDuration: canvasSettings.animationDuration,
  });

  // Memoize the context value
  const value = useMemo(
    () => ({
      // Include only what's defined in your context type
      ...canvasService,

      // States
      nodes,
      setNodes,
      edges,
      setEdges,
      highlightedNodeId,
      setHighlightedNodeId,
      highlightedEdges,
      setHighlightedEdges,
      highlightedNodes,
      setHighlightedNodes,
      reactFlowInstance,
      setReactFlowInstance,
      canvasSettings,
      setCanvasSettings,

      // Derived states
      visibleNodes,
      visibleEdges,
      animatedNodes,
    }),
    [
      canvasService,
      nodes,
      setNodes,
      edges,
      setEdges,
      highlightedNodeId,
      setHighlightedNodeId,
      highlightedEdges,
      setHighlightedEdges,
      highlightedNodes,
      setHighlightedNodes,
      reactFlowInstance,
      setReactFlowInstance,
      canvasSettings,
      setCanvasSettings,
      visibleNodes,
      visibleEdges,
      animatedNodes,
    ],
  );

  return <Provider value={value}>{children}</Provider>;
};

const CanvasProvider: FC<{ children: ReactNode }> = (props) => {
  return (
    <ReactFlowProvider>
      <MainCanvasProvider {...props} />
    </ReactFlowProvider>
  );
};

export { CanvasProvider };
