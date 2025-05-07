import { useEffect } from "react";
import {
  Node,
  Edge,
  Position,
  ReactFlowState,
  useStore,
  useReactFlow,
} from "reactflow";
import { stratify, tree } from "d3-hierarchy";

// Direction types for layout orientation
export type Direction = "TB" | "LR" | "RL" | "BT";
// TB = top to bottom, LR = left to right, etc.

export type Options = {
  direction: Direction;
};

/**
 * Mapping of direction characters to ReactFlow Position enum values
 * T = Top, L = Left, R = Right, B = Bottom
 */
const positionMap: Record<string, Position> = {
  T: Position.Top,
  L: Position.Left,
  R: Position.Right,
  B: Position.Bottom,
};

/**
 * Transforms coordinates based on the specified direction
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param direction - Layout direction
 * @returns Transformed coordinates
 */
const getPosition = (x: number, y: number, direction: Direction) => {
  console.log(`Transforming position (${x}, ${y}) for direction: ${direction}`);

  switch (direction) {
    case "LR":
      return { x: y, y: x };
    case "RL":
      return { x: -y, y: -x };
    case "BT":
      return { x: -x, y: -y };
    default:
      return { x, y };
  }
};

// Initialize the D3 tree layout with node spacing configuration
// See https://observablehq.com/@d3/tree for examples
const layout = tree<Node>()
  // Node size configures spacing between nodes [width, height]
  .nodeSize([130, 120])
  // Creates equal space between all nodes regardless of their depth
  .separation(() => 1);

// Selectors for React Flow store state
const nodeCountSelector = (state: ReactFlowState) => state.nodeInternals.size;
const nodesInitializedSelector = (state: ReactFlowState) =>
  Array.from(state.nodeInternals.values()).every(
    (node) => node.width && node.height
  );

/**
 * Custom hook that automatically layouts nodes in a tree structure
 * @param options - Configuration options including direction
 */
function useAutoLayout(options: Options) {
  const { direction } = options;
  const nodeCount = useStore(nodeCountSelector);
  const nodesInitialized = useStore(nodesInitializedSelector);
  const { getNodes, getEdges, setNodes, setEdges, fitView } = useReactFlow();

  useEffect(() => {
    // Only run layout if there are nodes and they have been initialized with dimensions
    if (!nodeCount || !nodesInitialized) {
      console.log("Layout skipped: nodes not ready", {
        count: nodeCount,
        initialized: nodesInitialized,
      });
      return;
    }

    console.log(`Running auto layout with direction: ${direction}`);

    const nodes: Node[] = getNodes();
    const edges: Edge[] = getEdges();

    console.log(`Organizing ${nodes.length} nodes and ${edges.length} edges`);

    try {
      // Create hierarchy using D3's stratify
      // This converts flat node data into a hierarchical structure
      const hierarchy = stratify<Node>()
        .id((d) => d.id)
        // Find parent of each node by searching through edges
        // This assumes every node has exactly one incoming connection
        .parentId((d: Node) => {
          const parentEdge = edges.find((e: Edge) => e.target === d.id);
          const parentId = parentEdge?.source;
          // Log any nodes without parents (should be only the root node)
          if (!parentId) {
            console.log(`Node ${d.id} has no parent (likely root node)`);
          }
          return parentId;
        })(nodes);

      // Apply the tree layout algorithm to the hierarchy
      const root = layout(hierarchy);
      console.log("Tree layout calculated successfully");

      // Update node positions based on layout results
      setNodes((nodes) =>
        nodes.map((node) => {
          // Find corresponding node in hierarchy
          const hierarchyNode = root.find((d) => d.id === node.id);

          if (!hierarchyNode) {
            console.warn(
              `Node ${node.id} not found in hierarchy, keeping original position`
            );
            return node;
          }

          const { x, y } = hierarchyNode;
          const newPosition = getPosition(x, y, direction);

          console.log(
            `Positioning node ${node.id} at (${newPosition.x}, ${newPosition.y})`
          );

          return {
            ...node,
            // Set connection points based on direction
            sourcePosition: positionMap[direction[1]],
            targetPosition: positionMap[direction[0]],
            position: newPosition,
            style: { opacity: 1 },
          };
        })
      );

      // Make edges visible
      setEdges((edges) =>
        edges.map((edge) => ({ ...edge, style: { opacity: 1 } }))
      );

      console.log("Auto layout complete");
    } catch (error) {
      console.error("Error during layout calculation:", error);
    }
  }, [
    nodeCount,
    nodesInitialized,
    getNodes,
    getEdges,
    setNodes,
    setEdges,
    fitView,
    direction,
  ]);
}

export default useAutoLayout;
