// src/domains/canvas/canvas.provider.tsx
import { FC, ReactNode, useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Edge, Node, ReactFlowInstance, ReactFlowProvider } from "reactflow";

import { Provider } from "./canvas.context";
import { useCanvasService } from "./canvas.services";
import useAutoLayout from "./hooks/useAutoLayout";
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

  // Track drag operations
  const isDraggingRef = useRef(false);
  const wasNodeAddedRef = useRef(false);
  const prevNodesCountRef = useRef(nodes.length);
  const lastDragEndTimeRef = useRef(0);

  // Canvas settings
  const [canvasSettings, setCanvasSettings] = useState({
    treeWidth: 400,
    treeHeight: 100,
    animationDuration: 300,
    direction: "LR" as "TB" | "LR" | "RL" | "BT",
  });

  // First use expand/collapse to determine visible nodes
  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(nodes, edges, {
    // Important: Set layoutNodes to false to let useAutoLayout handle layout
    layoutNodes: false,
    treeWidth: canvasSettings.treeWidth,
    treeHeight: canvasSettings.treeHeight,
    direction: canvasSettings.direction,
  });

  // Use auto layout hook
  const { triggerLayout } = useAutoLayout({
    direction: canvasSettings.direction,
    nodeWidth: canvasSettings.treeWidth,
    nodeHeight: canvasSettings.treeHeight,
    animationDuration: canvasSettings.animationDuration,
  });

  // Enhanced node state updater with drag detection
  const enhancedSetNodes = useCallback(
    (updater: React.SetStateAction<Node[]>) => {
      setNodes((currentNodes) => {
        const newNodes = typeof updater === "function" ? updater(currentNodes) : updater;

        // Check if node count changed (node added or removed)
        if (newNodes.length !== currentNodes.length) {
          wasNodeAddedRef.current = true;
          prevNodesCountRef.current = newNodes.length;
        }

        // Check for expand/collapse operations
        const expandCollapseOperation = newNodes.some((newNode, index) => {
          if (index >= currentNodes.length) return false;
          const currentNode = currentNodes[index];
          return newNode.id === currentNode.id && newNode.data?.expanded !== currentNode.data?.expanded;
        });

        if (expandCollapseOperation) {
          // Schedule layout after expand/collapse with a slight delay
          setTimeout(() => {
            triggerLayout();
          }, 50);
        }

        // Check if any node is being dragged
        const hasDraggingNode = newNodes.some((node) => node.dragging);

        // Track start of drag operation
        if (hasDraggingNode && !isDraggingRef.current) {
          isDraggingRef.current = true;
        }

        // Track end of drag operation
        if (!hasDraggingNode && isDraggingRef.current) {
          isDraggingRef.current = false;
          lastDragEndTimeRef.current = Date.now();

          // Schedule layout after drag ends with a slight delay
          setTimeout(() => {
            triggerLayout();
          }, 200);
        }

        return newNodes;
      });
    },
    [triggerLayout],
  );

  // Trigger layout when node count changes (node added)
  useEffect(() => {
    if (wasNodeAddedRef.current && reactFlowInstance) {
      wasNodeAddedRef.current = false;

      // Use a timeout to ensure nodes are rendered before layout
      setTimeout(() => {
        triggerLayout();
      }, 200);
    }
  }, [nodes.length, reactFlowInstance, triggerLayout]);

  // Initial layout when component mounts or direction changes
  useEffect(() => {
    if (reactFlowInstance && visibleNodes.length > 0) {
      triggerLayout();
    }
  }, [reactFlowInstance, canvasSettings.direction, triggerLayout]);

  // Toggle node expansion
  const toggleNodeExpansion = useCallback(
    (nodeId: string) => {
      enhancedSetNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                expanded: !node.data?.expanded,
              },
            };
          }
          return node;
        }),
      );
    },
    [enhancedSetNodes],
  );

  // Exposed function to manually trigger layout
  const autoLayoutCanvas = useCallback(() => {
    triggerLayout();
  }, [triggerLayout]);

  // Memoize the context value
  const value = useMemo(
    () => ({
      // Include only what's defined in your context type
      ...canvasService,

      // States
      nodes,
      setNodes: enhancedSetNodes,
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

      // Functions
      autoLayoutCanvas,
      toggleNodeExpansion,

      // Derived states
      visibleNodes,
      visibleEdges,
      // For API compatibility with existing code
      animatedNodes: visibleNodes,
    }),
    [
      canvasService,
      nodes,
      enhancedSetNodes,
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
      autoLayoutCanvas,
      toggleNodeExpansion,
      visibleNodes,
      visibleEdges,
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
