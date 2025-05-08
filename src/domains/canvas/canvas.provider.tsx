// src/domains/canvas/canvas.provider.tsx
import { FC, ReactNode, useCallback, useMemo, useState } from "react";
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

  // Function to get all descendants of a node
  const getNodeDescendants = useCallback(
    (nodeId: string) => {
      const descendants = new Set<string>();
      const edgesToHighlight = new Set<string>();

      // Recursive function to find all children
      const findChildren = (id: string) => {
        // Add this node to the set
        descendants.add(id);

        // Find all direct children
        edges.forEach((edge) => {
          if (edge.source === id) {
            // This is a connection from our node to a child
            edgesToHighlight.add(edge.id);
            descendants.add(edge.target);
            // Recursively find children of this child
            findChildren(edge.target);
          }
        });
      };

      findChildren(nodeId);
      return { descendants, edgesToHighlight };
    },
    [edges],
  );

  // Function to highlight a node and its children
  const highlightNodes = useCallback(
    (nodeId: string) => {
      if (!nodeId) {
        // Clear highlighting
        setHighlightedNodeId(null);
        setHighlightedEdges(new Set());
        setHighlightedNodes(new Set());
        return;
      }

      // Get all descendants and related edges
      const { descendants, edgesToHighlight } = getNodeDescendants(nodeId);

      // Update state
      setHighlightedNodeId(nodeId);
      setHighlightedNodes(descendants);
      setHighlightedEdges(edgesToHighlight);
    },
    [getNodeDescendants],
  );

  // Zoom controls with proper type checking
  const zoomIn = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomIn();
    }
  }, [reactFlowInstance]);

  const zoomOut = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomOut();
    }
  }, [reactFlowInstance]);

  const fitView = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView();
    }
  }, [reactFlowInstance]);

  // Use custom hooks
  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(nodes, edges, {
    treeWidth: canvasSettings.treeWidth,
    treeHeight: canvasSettings.treeHeight,
    direction: canvasSettings.direction,
  });

  const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, {
    animationDuration: canvasSettings.animationDuration,
  });

  // Memoize the context value - this is where the type error occurs
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
      highlightedEdges,
      highlightedNodes,
      reactFlowInstance,
      setReactFlowInstance,
      canvasSettings,

      // Derived states
      visibleNodes,
      visibleEdges,
      animatedNodes,

      // Functions
      highlightNodes,
      getNodeDescendants,
      zoomIn,
      zoomOut,
      fitView,
      setCanvasSettings,
    }),
    [
      canvasService,
      nodes,
      edges,
      highlightedNodeId,
      highlightedEdges,
      highlightedNodes,
      reactFlowInstance,
      canvasSettings,
      visibleNodes,
      visibleEdges,
      animatedNodes,
      highlightNodes,
      getNodeDescendants,
      zoomIn,
      zoomOut,
      fitView,
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
