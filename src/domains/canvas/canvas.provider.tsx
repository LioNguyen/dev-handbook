// src/domains/canvas/canvas.provider.tsx
import { FC, ReactNode, useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Edge, Node, ReactFlowInstance, ReactFlowProvider } from "@xyflow/react";

import { Provider } from "./canvas.context";
import { useCanvasService } from "./canvas.services";
import useAutoLayout from "./hooks/useAutoLayout";
import useExpandCollapse from "./hooks/useExpandCollapse";
import useAnimatedNodes from "./hooks/useAnimatedNodes";

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

  // Track drag state in a ref to avoid re-renders
  const isDraggingRef = useRef(false);

  // Other refs
  const wasNodeAddedRef = useRef(false);
  const prevNodesCountRef = useRef(nodes.length);
  const lastDragEndTimeRef = useRef(0);
  const layoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Canvas settings
  const [canvasSettings, setCanvasSettings] = useState({
    treeWidth: 400,
    treeHeight: 100,
    animationDuration: 200,
    direction: "LR" as "TB" | "LR" | "RL" | "BT",
  });

  // First use expand/collapse to determine visible nodes
  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(nodes, edges, {
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

  // Use animated nodes hook, but only if we're not dragging
  const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, {
    animationDuration: isDraggingRef?.current ? 50 : canvasSettings.animationDuration,
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

        if (expandCollapseOperation && !isDraggingRef.current) {
          // Clear any existing timeout
          if (layoutTimeoutRef.current) {
            clearTimeout(layoutTimeoutRef.current);
          }

          // Schedule layout after expand/collapse with a slight delay
          layoutTimeoutRef.current = setTimeout(() => {
            triggerLayout();
            layoutTimeoutRef.current = null;
          }, 50);
        }

        // Check if any node is being dragged
        const hasDraggingNode = newNodes.some((node) => node.dragging);

        // Track start of drag operation - don't log here to avoid console spam
        if (hasDraggingNode && !isDraggingRef.current) {
          isDraggingRef.current = true;
        }

        // Track end of drag operation
        if (!hasDraggingNode && isDraggingRef.current) {
          isDraggingRef.current = false;
          lastDragEndTimeRef.current = Date.now();

          // Clear any existing timeout
          if (layoutTimeoutRef.current) {
            clearTimeout(layoutTimeoutRef.current);
          }

          // Schedule layout after drag ends with a slight delay
          layoutTimeoutRef.current = setTimeout(() => {
            triggerLayout();
            layoutTimeoutRef.current = null;
          }, 200);
        }

        return newNodes;
      });
    },
    [triggerLayout],
  );

  // Make sure nodes have initial positions - run only once
  useEffect(() => {
    if (nodes.length > 0) {
      const nodesNeedPositions = nodes.some(
        (node) => !node.position || (node.position.x === 0 && node.position.y === 0),
      );

      if (nodesNeedPositions) {
        const updatedNodes = nodes.map((node, index) => ({
          ...node,
          position: node.position || { x: index * 200, y: index * 100 },
        }));

        setNodes(updatedNodes);
      }
    }
  }, []); // Empty dependency array to run only once

  // Trigger layout when node count changes (node added)
  useEffect(() => {
    if (wasNodeAddedRef.current && reactFlowInstance && !isDraggingRef.current) {
      wasNodeAddedRef.current = false;

      // Clear any existing timeout
      if (layoutTimeoutRef.current) {
        clearTimeout(layoutTimeoutRef.current);
      }

      // Use a timeout to ensure nodes are rendered before layout
      layoutTimeoutRef.current = setTimeout(() => {
        triggerLayout();
        layoutTimeoutRef.current = null;
      }, 200);
    }
  }, [nodes.length, reactFlowInstance, triggerLayout]);

  // Initial layout when component mounts or direction changes
  useEffect(() => {
    if (reactFlowInstance && animatedNodes.length > 0 && !isDraggingRef.current) {
      triggerLayout();
    }
  }, [animatedNodes, reactFlowInstance, canvasSettings.direction, triggerLayout]);

  // Cleanup effect for timers
  useEffect(() => {
    return () => {
      if (layoutTimeoutRef.current) {
        clearTimeout(layoutTimeoutRef.current);
      }
    };
  }, []);

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
    if (!isDraggingRef.current) {
      triggerLayout();
    }
  }, [triggerLayout]);

  // Get current drag state for the context value
  // We do this to avoid frequent re-renders due to isDragging changes
  const getIsDragging = useCallback(() => isDraggingRef.current, []);

  // Memoize the context value to prevent unnecessary re-renders
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
      getIsDragging, // Provide the getter function instead of the state

      // Functions
      autoLayoutCanvas,
      toggleNodeExpansion,

      // Derived states
      visibleNodes,
      visibleEdges,
      animatedNodes,
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
      getIsDragging, // Only depend on the getter function
      autoLayoutCanvas,
      toggleNodeExpansion,
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
