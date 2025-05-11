import { Edge, Node, Position, XYPosition } from "@xyflow/react";

import { ExtendedReactFlowInstance } from "./extendedFlowInstance";

// Direction types for layout orientation
export type Direction = "TB" | "LR" | "RL" | "BT";

/**
 * Mapping of direction characters to ReactFlow Position enum values
 */
export const positionMap: Record<string, Position> = {
  T: Position.Top,
  L: Position.Left,
  R: Position.Right,
  B: Position.Bottom,
};

/**
 * Transforms coordinates based on the specified direction
 */
export const getPosition = (x: number, y: number, direction: Direction): XYPosition => {
  switch (direction) {
    case "LR":
      return { x: y, y: x };
    case "RL":
      return { x: -y, y: x };
    case "BT":
      return { x: x, y: -y };
    default: // TB
      return { x, y };
  }
};

/**
 * Separates nodes into connected and standalone groups
 */
export const separateNodes = (nodes: Node[], edges: Edge[]) => {
  // Find nodes that are involved in any connection (either source or target)
  const connectedNodeIds = new Set<string>();
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  // Separate connected and standalone nodes
  const connectedNodes = nodes.filter((node) => connectedNodeIds.has(node.id));
  const standaloneNodes = nodes.filter((node) => !connectedNodeIds.has(node.id));

  return { connectedNodes, standaloneNodes, connectedNodeIds };
};

/**
 * Finds the root node for tree layout
 */
export const findRootNode = (connectedNodes: Node[], edges: Edge[]) => {
  // Find roots (nodes that have no incoming edges but have outgoing edges)
  const targetsSet = new Set(edges.map((e) => e.target));
  const rootNodes = connectedNodes.filter(
    (node) => !targetsSet.has(node.id) && edges.some((e) => e.source === node.id),
  );

  // If no clear root found, use the first node with an outgoing edge
  return rootNodes.length > 0
    ? rootNodes[0]
    : connectedNodes.find((node) => edges.some((e) => e.source === node.id)) || connectedNodes[0];
};

/**
 * Function to get all currently selected nodes and their connected edges
 */
export function getSelectedNodes(nodes: Node[], edges: Edge[]) {
  const selectedNodeIds = new Set<string>();
  const connectedEdgeIds = new Set<string>();

  // Find all selected nodes
  nodes.forEach((node) => {
    if (node.selected) {
      selectedNodeIds.add(node.id);
    }
  });

  // Find all edges connected between selected nodes
  edges.forEach((edge) => {
    // If both source and target nodes are selected, include this edge
    if (selectedNodeIds.has(edge.source) && selectedNodeIds.has(edge.target)) {
      connectedEdgeIds.add(edge.id);
    }
  });

  return {
    selectedNodeIds,
    connectedEdgeIds,
    selectedNodes: nodes.filter((node) => selectedNodeIds.has(node.id)),
    connectedEdges: edges.filter((edge) => connectedEdgeIds.has(edge.id)),
  };
}

/**
 * Helper function to get child nodes and edges of selected nodes
 * Now using the instance.getNodeTree when an instance is provided
 */
export function getSelectedChildrenData(nodes: Node[], edges: Edge[], instance?: ExtendedReactFlowInstance | null) {
  const { selectedNodeIds } = getSelectedNodes(nodes, edges);
  const childSelectedNodeIds = new Set<string>();
  const childSelectedEdgeIds = new Set<string>();

  // For each selected node, find all of its child nodes and edges
  selectedNodeIds.forEach((nodeId) => {
    // Use instance.getNodeTree if instance is provided, otherwise fall back to edges parameter
    const nodeTree = instance
      ? instance.getNodeTree(nodeId)
      : {
          treeNodeIds: new Set<string>(),
          treeEdgeIds: new Set<string>(),
        };

    // Remove the parent node itself from the set
    nodeTree.treeNodeIds.delete(nodeId);

    // Add all child nodes to our set
    nodeTree.treeNodeIds.forEach((childId) => {
      childSelectedNodeIds.add(childId);
    });

    // Add all edges to our set
    nodeTree.treeEdgeIds.forEach((edgeId) => {
      childSelectedEdgeIds.add(edgeId);
    });
  });

  return {
    selectedNodeIds,
    childSelectedNodeIds,
    childSelectedEdgeIds,
  };
}
