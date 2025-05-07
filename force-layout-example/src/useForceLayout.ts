// 2. Force Layout Hook
import { useEffect } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from "d3-force";
import { useReactFlow, ReactFlowState, useStore, Node } from "reactflow";

/**
 * Options for customizing the force-directed layout
 */
type UseForceLayoutOptions = {
  strength: number; // Repulsion force between nodes (negative value)
  distance: number; // Preferred distance between connected nodes
};

/**
 * Extended node type that combines ReactFlow Node with D3 simulation node properties
 */
type SimNodeType = SimulationNodeDatum & Node;

/**
 * Selector to get the total count of elements (nodes + edges)
 * Used to trigger layout recalculation when elements change
 */
const elementCountSelector = (state: ReactFlowState) =>
  state.nodeInternals.size + state.edges.length;

/**
 * Selector to check if all nodes have been initialized with dimensions
 * Layout calculation should wait until nodes are fully rendered
 */
const nodesInitializedSelector = (state: ReactFlowState) =>
  Array.from(state.nodeInternals.values()).every(
    (node) => node.width && node.height
  ) && state.nodeInternals.size;

/**
 * Custom hook that applies D3 force-directed layout to ReactFlow nodes
 *
 * @param options Configuration options for the force simulation
 */
function useForceLayout({
  strength = -1000,
  distance = 150,
}: UseForceLayoutOptions) {
  console.log("Force layout hook initialized with", { strength, distance });

  // Get element count and initialization status from ReactFlow store
  const elementCount = useStore(elementCountSelector);
  const nodesInitialized = useStore(nodesInitializedSelector);

  // Get ReactFlow methods for node manipulation
  const { setNodes, getNodes, getEdges } = useReactFlow();

  useEffect(() => {
    console.log(
      `Elements changed: ${elementCount} elements, nodes initialized: ${nodesInitialized}`
    );

    const nodes = getNodes();
    const edges = getEdges();

    // Skip layout if no nodes or if nodes aren't fully initialized yet
    if (!nodes.length || !nodesInitialized) {
      console.log("Skipping force layout - nodes not ready");
      return;
    }

    console.log(
      `Starting force simulation with ${nodes.length} nodes and ${edges.length} edges`
    );

    // Convert ReactFlow nodes to D3 simulation nodes
    const simulationNodes: SimNodeType[] = nodes.map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));

    // Convert ReactFlow edges to D3 simulation links
    const simulationLinks: SimulationLinkDatum<SimNodeType>[] = edges.map(
      (edge) => edge
    );

    // Create and configure the force simulation
    console.log("Configuring force simulation");
    const simulation = forceSimulation()
      .nodes(simulationNodes)
      // Apply repulsive force between all nodes
      .force("charge", forceManyBody().strength(strength))
      // Apply attractive force along links (connections)
      .force(
        "link",
        forceLink(simulationLinks)
          .id((d: any) => d.id)
          .strength(0.05) // Low strength to avoid overpowering repulsion
          .distance(distance) // Preferred distance between connected nodes
      )
      // Apply centering forces
      .force("x", forceX().x(0).strength(0.08))
      .force("y", forceY().y(0).strength(0.08))
      // Update node positions on each simulation tick
      .on("tick", () => {
        // Apply calculated positions to ReactFlow nodes
        setNodes(
          simulationNodes.map((node) => {
            const newX = node.x ?? 0;
            const newY = node.y ?? 0;

            // Only log significant position changes to avoid console spam
            if (
              Math.abs(newX - node.position.x) > 5 ||
              Math.abs(newY - node.position.y) > 5
            ) {
              console.log(
                `Node ${node.id} moved to (${newX.toFixed(2)}, ${newY.toFixed(
                  2
                )})`
              );
            }

            return {
              id: node.id,
              data: node.data,
              position: { x: newX, y: newY },
              className: node.className,
            };
          })
        );
      });

    // Clean up simulation when component unmounts or when nodes/edges change
    return () => {
      console.log("Stopping force simulation");
      simulation.stop();
    };
  }, [
    elementCount,
    getNodes,
    getEdges,
    setNodes,
    strength,
    distance,
    nodesInitialized,
  ]);
}

export default useForceLayout;
