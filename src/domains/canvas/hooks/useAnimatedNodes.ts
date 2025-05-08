import { useEffect, useState } from "react";
import { Node, useReactFlow } from "reactflow";
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
  // State for storing nodes during animation
  const [tmpNodes, setTmpNodes] = useState(nodes);
  // Get access to the ReactFlow instance
  const { getNode } = useReactFlow();

  useEffect(() => {
    // Create transition data for each node
    const transitions = nodes.map((node) => {
      const currentNode = getNode(node.id);
      const fromPosition = currentNode?.position ?? node.position;

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
      const s = elapsed / animationDuration;

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
        // Important to set final positions to avoid rounding errors
        setTmpNodes(nodes);
        t.stop();
      }
    });

    // Clean up timer on unmount or when nodes change
    return () => {
      t.stop();
    };
  }, [nodes, getNode, animationDuration]);

  return { nodes: tmpNodes };
}

export default useAnimatedNodes;
