// src/domains/canvas/hooks/useAnimatedNodes.ts
import { useEffect, useState, useRef } from "react";
import { Node } from "reactflow";
import { timer } from "d3-timer";

/**
 * Options for the animated nodes hook
 */
export type UseAnimatedNodeOptions = {
  animationDuration?: number; // Duration of animations in milliseconds
};

/**
 * Custom hook that animates node position changes
 * Now with proper drag support
 */
function useAnimatedNodes(nodes: Node[], { animationDuration = 300 }: UseAnimatedNodeOptions = {}) {
  // Use the direct nodes when dragging, otherwise use animated nodes
  const [animatedNodes, setAnimatedNodes] = useState<Node[]>(nodes);
  const draggingNodeIdsRef = useRef(new Set<string>());
  const prevPositionsRef = useRef<Record<string, { x: number; y: number }>>({});
  const animationTimerRef = useRef<any>(null);

  // First, check if any nodes are being dragged
  const isDragging = nodes.some((node) => node.dragging);

  // Update the nodes immediately when dragging
  useEffect(() => {
    // Update dragging node IDs
    const draggingNodeIds = new Set<string>();
    nodes.forEach((node) => {
      if (node.dragging) {
        draggingNodeIds.add(node.id);
      }
    });
    draggingNodeIdsRef.current = draggingNodeIds;

    // If any node is being dragged, update all nodes immediately
    if (isDragging) {
      setAnimatedNodes(nodes);

      // Cancel any ongoing animations
      if (animationTimerRef.current) {
        animationTimerRef.current.stop();
        animationTimerRef.current = null;
      }
    }
  }, [nodes, isDragging]);

  // Handle node animations when not dragging
  useEffect(() => {
    // Skip animation if dragging
    if (isDragging) return;

    // Store previous positions when there's a change and we're not dragging
    const newPositions: Record<string, { x: number; y: number }> = {};
    const needsAnimation = nodes.some((node) => {
      const prevPos = prevPositionsRef.current[node.id];
      if (!prevPos) {
        newPositions[node.id] = { ...node.position };
        return false;
      }

      const dx = Math.abs(prevPos.x - node.position.x);
      const dy = Math.abs(prevPos.y - node.position.y);

      if (dx > 1 || dy > 1) {
        newPositions[node.id] = { ...node.position };
        return true;
      }

      newPositions[node.id] = { ...node.position };
      return false;
    });

    // Update previous positions
    prevPositionsRef.current = newPositions;

    // Skip animation if no significant position changes
    if (!needsAnimation) {
      setAnimatedNodes(nodes);
      return;
    }

    // Stop any existing animation
    if (animationTimerRef.current) {
      animationTimerRef.current.stop();
    }

    // Start animation from current positions to new positions
    let startNodes = [...animatedNodes];

    // Create the animation timer
    animationTimerRef.current = timer((elapsed) => {
      // Calculate progress (0 to 1)
      const progress = Math.min(1, elapsed / animationDuration);

      // Create new nodes with interpolated positions
      const interpolatedNodes = nodes.map((targetNode) => {
        // Find the starting node
        const startNode = startNodes.find((n) => n.id === targetNode.id);
        if (!startNode) return targetNode;

        // Calculate interpolated position
        return {
          ...targetNode,
          position: {
            x: startNode.position.x + (targetNode.position.x - startNode.position.x) * progress,
            y: startNode.position.y + (targetNode.position.y - startNode.position.y) * progress,
          },
        };
      });

      setAnimatedNodes(interpolatedNodes);

      // Stop animation when complete
      if (progress === 1) {
        animationTimerRef.current.stop();
        animationTimerRef.current = null;
      }
    });

    return () => {
      if (animationTimerRef.current) {
        animationTimerRef.current.stop();
      }
    };
  }, [nodes, animationDuration, isDragging, animatedNodes]);

  // If there are no nodes, reset the animated nodes
  useEffect(() => {
    if (nodes.length === 0) {
      setAnimatedNodes([]);
    }
  }, [nodes.length]);

  return { nodes: animatedNodes };
}

export default useAnimatedNodes;
