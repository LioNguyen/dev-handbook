// src/domains/canvas/hooks/useAnimatedNodes.tsx
import { useEffect, useState } from "react";
import { Node, useReactFlow } from "@xyflow/react";
import { timer } from "d3-timer";

/**
 * Options for the animated nodes hook
 */
export type UseAnimatedNodeOptions = {
  animationDuration?: number; // Duration of animations in milliseconds
};

/**
 * Custom hook that animates node position changes
 * Rather than immediately jumping to new positions, nodes smoothly
 * transition from their old positions to new ones.
 *
 * @param nodes The current nodes with their target positions
 * @param options Configuration options including animation duration
 * @returns Object containing the nodes with interpolated positions during animation
 */
function useAnimatedNodes(nodes: Node[], { animationDuration = 300 }: UseAnimatedNodeOptions = {}) {
  console.log("🚀 @LIO ~ useAnimatedNodes.ts ~ 23 ~ animationDuration ~ ", animationDuration);

  // State for storing nodes during animation
  const [tmpNodes, setTmpNodes] = useState<Node[]>(nodes);
  // Get access to the ReactFlow instance
  const { getNode } = useReactFlow();

  useEffect(() => {
    // If there are no nodes, just set empty array
    if (nodes.length === 0) {
      setTmpNodes([]);
      return;
    }

    console.log("Starting node animation with duration:", animationDuration);

    // Create transition data for each node
    const transitions = nodes.map((node) => {
      const currentNode = getNode(node.id);
      // Use current node position or fallback to target position if node is new
      const fromPosition = currentNode?.position ?? node.position;

      console.log(
        `Node ${node.id} transition: (${fromPosition.x}, ${fromPosition.y}) → (${node.position.x}, ${node.position.y})`,
      );

      return {
        id: node.id,
        from: fromPosition,
        to: node.position,
        node,
      };
    });

    // Create timer for animation
    const t = timer((elapsed) => {
      // Calculate progress (0 to 1)
      const s = Math.min(1, elapsed / animationDuration);

      if (elapsed % 50 === 0) {
        console.log(`Animation progress: ${Math.min(100, Math.round(s * 100))}%`);
      }

      // Calculate interpolated positions for all nodes
      const currNodes = transitions.map(({ node, from, to }) => {
        return {
          ...node,
          position: {
            x: from.x + (to.x - from.x) * s,
            y: from.y + (to.y - from.y) * s,
          },
        };
      });

      // Update nodes with interpolated positions
      setTmpNodes(currNodes);

      // Stop animation when complete
      if (elapsed > animationDuration) {
        console.log("Animation complete, setting final positions");
        // Important to set final positions to avoid rounding errors
        setTmpNodes(nodes);
        t.stop();
      }
    });

    // Clean up timer on unmount or when nodes change
    return () => {
      console.log("Cleaning up animation timer");
      t.stop();
    };
  }, [nodes, getNode, animationDuration]);

  return { nodes: tmpNodes };
}

export default useAnimatedNodes;
