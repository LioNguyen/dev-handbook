import { Node, Edge } from "@xyflow/react";

// Use a Record instead of indexed interface as recommended
type LevelKeys = Record<number, string[]>;

export function getKeysAtEachLevel(data: unknown, level = 0): LevelKeys {
  // Explicitly type with Record using string keys (which will be converted to number later)
  const levelInfo: Record<string, Set<string>> = {};

  function processObject(obj: unknown, currentLevel: number): void {
    // Better type checking for object
    if (!obj || typeof obj !== "object" || obj === null) return;

    // Initialize set for this level if it doesn't exist
    if (!levelInfo[currentLevel.toString()]) levelInfo[currentLevel.toString()] = new Set<string>();

    // Add all keys except 'result' to this level's set
    Object.keys(obj as Record<string, unknown>).forEach((key) => {
      if (key !== "result") {
        levelInfo[currentLevel.toString()].add(key);
      }
    });

    // Type assertion for accessing properties on an unknown type
    const typedObj = obj as Record<string, unknown>;

    // Process the result key to get to the next level
    if ("result" in typedObj && typedObj.result) {
      if (Array.isArray(typedObj.result)) {
        // If result is an array, process each item
        typedObj.result.forEach((item) => {
          processObject(item, currentLevel + 1);
        });
      } else {
        // If result is an object, process it
        processObject(typedObj.result, currentLevel + 1);
      }
    }
  }

  // If data is an array, process each item
  if (Array.isArray(data)) {
    data.forEach((item) => processObject(item, level));
  } else {
    processObject(data, level);
  }

  // Convert Sets to Arrays for the final output
  const result: LevelKeys = {};
  Object.keys(levelInfo).forEach((levelKey) => {
    const numericKey = parseInt(levelKey);
    result[numericKey] = Array.from(levelInfo[levelKey]);
  });

  return result;
}

type KeyToRenderType = {
  node: string[];
  leaf?: KeyToRenderType;
};

/**
 * Converts a flat node structure to a nested keyToRender object
 * based on the node hierarchy defined by the edges.
 * Excludes the root node (type "root") from the keyToRender structure.
 *
 * @param nodes Array of React Flow nodes
 * @param edges Array of React Flow edges
 * @returns A nested keyToRender structure representing the node hierarchy
 */
export function createKeyToRender(nodes: Node[], edges: Edge[]): KeyToRenderType {
  // Create a map of node IDs to their values for quick lookup
  const nodeValueMap = new Map<string, string[]>();

  // Also track node types
  const nodeTypeMap = new Map<string, string>();

  // Find the root node ID
  let rootNodeId: string | undefined;

  for (const node of nodes) {
    // Store the node type
    nodeTypeMap.set(node.id, node.type || "");

    // Identify the root node
    if (node.type === "root") {
      rootNodeId = node.id;
    }

    // Store node values
    if (Array.isArray(node.data?.value)) {
      nodeValueMap.set(node.id, node.data.value);
    } else {
      nodeValueMap.set(node.id, []);
    }
  }

  if (!rootNodeId) {
    throw new Error("No root node (type 'root') found in the nodes array");
  }

  // Build the children map (which nodes are children of which nodes)
  const childrenMap = new Map<string, string[]>();
  for (const edge of edges) {
    const source = edge.source;
    const target = edge.target;

    if (!childrenMap.has(source)) {
      childrenMap.set(source, []);
    }
    childrenMap.get(source)?.push(target);
  }

  // Recursive function to build the keyToRender structure
  function buildKeyToRender(nodeId: string): KeyToRenderType {
    // Skip root node's values
    const isRootNode = nodeTypeMap.get(nodeId) === "root";
    const values = isRootNode ? [] : nodeValueMap.get(nodeId) || [];
    const children = childrenMap.get(nodeId);

    // If this node has children, create a leaf structure for them
    if (children && children.length > 0) {
      const result: KeyToRenderType = { node: [...values] };

      // Process all children by recursively building their structures
      if (children.length === 1) {
        // If there's only one child, it becomes the direct leaf of this node
        result.leaf = buildKeyToRender(children[0]);
      } else {
        // If there are multiple children, create a more complex leaf structure
        // that merges values from all children
        const childValues = children.flatMap((childId) => {
          // Skip root node values
          return nodeTypeMap.get(childId) === "root" ? [] : nodeValueMap.get(childId) || [];
        });

        const nestedLeaves: KeyToRenderType = { node: [...new Set(childValues)] };

        // Process nested leaf structures recursively
        const furtherDescendants: string[] = [];
        for (const childId of children) {
          const grandChildren = childrenMap.get(childId);
          if (grandChildren && grandChildren.length > 0) {
            furtherDescendants.push(...grandChildren);
          }
        }

        if (furtherDescendants.length > 0) {
          nestedLeaves.leaf = buildNestedLeaves(furtherDescendants);
        }

        result.leaf = nestedLeaves;
      }

      return result;
    }

    // If this is a leaf node (no children), return just the node values
    return { node: [...values] };
  }

  // Helper function to process multiple nodes at the same time for deeper levels
  function buildNestedLeaves(nodeIds: string[]): KeyToRenderType {
    // Collect all values from these nodes, skipping root nodes
    const allValues = nodeIds.flatMap((id) => {
      return nodeTypeMap.get(id) === "root" ? [] : nodeValueMap.get(id) || [];
    });

    const uniqueValues = [...new Set(allValues)];

    // Create the nested leaf structure
    const result: KeyToRenderType = { node: uniqueValues };

    // Check for further descendants
    const allChildren: string[] = [];
    for (const nodeId of nodeIds) {
      const children = childrenMap.get(nodeId);
      if (children && children.length > 0) {
        allChildren.push(...children);
      }
    }

    // If there are further descendants, continue nesting
    if (allChildren.length > 0) {
      result.leaf = buildNestedLeaves(allChildren);
    }

    return result;
  }

  // Get the first level children of the root node
  const rootChildren = childrenMap.get(rootNodeId) || [];

  // If the root has only one child, start building from that child
  if (rootChildren.length === 1) {
    return buildKeyToRender(rootChildren[0]);
  }

  // If the root has multiple children, build a structure merging values from all root children
  const firstLevelValues = rootChildren.flatMap((childId) => nodeValueMap.get(childId) || []);
  const result: KeyToRenderType = { node: [...new Set(firstLevelValues)] };

  // Process deeper levels
  const secondLevelNodes: string[] = [];
  for (const childId of rootChildren) {
    const grandChildren = childrenMap.get(childId);
    if (grandChildren && grandChildren.length > 0) {
      secondLevelNodes.push(...grandChildren);
    }
  }

  if (secondLevelNodes.length > 0) {
    result.leaf = buildNestedLeaves(secondLevelNodes);
  }

  return result;
}

interface KeyToRenderNode {
  node: string[];
  leaf?: KeyToRenderNode | {};
}

/**
 * Generates React Flow nodes and edges based on JSON data and keyToRender structure
 * @param jsonData - The JSON data to process
 * @param keyToRender - Structure defining what keys to render at each level
 * @returns Object containing nodes and edges for React Flow
 */
export function generateNodesAndEdges(jsonData: any[], keyToRender: KeyToRenderNode): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let nodeCounter = 1;

  // Add root node
  const rootNode: Node = {
    id: `${nodeCounter}`,
    type: "root",
    draggable: false,
    position: { x: 0, y: 0 },
    data: {},
  };

  nodes.push(rootNode);
  nodeCounter++;

  // Function to process each data item recursively
  const processItem = (
    item: any,
    keyStructure: KeyToRenderNode | {},
    parentId: string,
    depth = 0,
    xPos = 200,
    yPos = -450,
    yOffset = 100,
  ) => {
    // If keyStructure is empty or doesn't have 'node', stop processing
    if (!keyStructure || Object.keys(keyStructure).length === 0) {
      return;
    }

    // If keyStructure has no 'node' property or node array is empty, skip this level and go to leaf
    if (!("node" in keyStructure) || !(keyStructure as KeyToRenderNode).node.length) {
      const leaf = (keyStructure as KeyToRenderNode).leaf;
      if (leaf && Object.keys(leaf).length > 0 && "result" in item) {
        const results = Array.isArray(item.result) ? item.result : [item.result];
        results.forEach((result: any, idx: number) => {
          if (result === null || result === undefined) return;

          let newYPos = yPos;
          if (results.length > 1) {
            newYPos += (idx - Math.floor(results.length / 2)) * yOffset;
          }

          processItem(result, leaf, parentId, depth, xPos, newYPos, yOffset / 2);
        });
      }
      return;
    }

    // Create node with data from fields in keyStructure.node
    const nodeData: any = {};

    (keyStructure as KeyToRenderNode).node.forEach((key) => {
      if (key in item && item[key] !== null && item[key] !== undefined) {
        nodeData[key] = item[key];
      }
    });

    // If nodeData is empty, skip creating this node and try processing the leaf with parent ID
    if (Object.keys(nodeData).length === 0) {
      const leaf = (keyStructure as KeyToRenderNode).leaf;
      if (leaf && Object.keys(leaf).length > 0 && "result" in item) {
        const results = Array.isArray(item.result) ? item.result : [item.result];
        results.forEach((result: any, idx: number) => {
          if (result === null || result === undefined) return;

          let newYPos = yPos;
          if (results.length > 1) {
            newYPos += (idx - Math.floor(results.length / 2)) * yOffset;
          }

          processItem(result, leaf, parentId, depth, xPos, newYPos, yOffset / 2);
        });
      }
      return;
    }

    // Determine node style based on parentLeadType or status
    if (nodeData.parentLeadType === "AWS IAM USER") {
      nodeData.nodeStyle = "aws";
    } else if (nodeData.parentLeadType === "GCP SERVICE ACCOUNT") {
      nodeData.nodeStyle = "gcp";
    } else if (nodeData.parentLeadType === "AZURE DEVICE") {
      nodeData.nodeStyle = "microsoft";
    } else if (nodeData.parentLeadType === "SSH KEY" || nodeData.parentLeadType === "API TOKEN") {
      nodeData.nodeStyle = "key";
    } else if (nodeData.status === "Succeeded" || nodeData.conditionalAccessStatus === "successGrant") {
      nodeData.nodeStyle = "success";
    } else if (nodeData.status === "Failed" || nodeData.conditionalAccessStatus === "failure") {
      nodeData.nodeStyle = "error";
    } else if (nodeData.parentLeadType) {
      nodeData.nodeStyle = "ip";
    }

    const node: Node = {
      id: `${nodeCounter}`,
      type: "custom",
      position: { x: xPos, y: yPos },
      data: nodeData,
    };

    nodes.push(node);

    // Create edge from parent to this node
    const edge: Edge = {
      id: `e${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
    };

    edges.push(edge);

    const currentNodeId = `${nodeCounter}`;
    nodeCounter++;

    // Process next level if there's a leaf and results
    const leaf = (keyStructure as KeyToRenderNode).leaf;

    if (leaf && Object.keys(leaf).length > 0 && "result" in item) {
      const results = Array.isArray(item.result) ? item.result : [item.result];

      results.forEach((result: any, idx: number) => {
        // Skip null or undefined results
        if (result === null || result === undefined) {
          return;
        }

        // Calculate new position for child nodes
        let newYPos = yPos;
        if (results.length > 1) {
          // Distribute multiple results vertically
          newYPos += (idx - Math.floor(results.length / 2)) * yOffset;
        }

        processItem(result, leaf, currentNodeId, depth + 1, xPos + 200, newYPos, yOffset / 2);
      });
    }
  };

  // Process each item in the JSON data
  jsonData.forEach((item, index) => {
    const yPosition = -450 + index * 100;
    processItem(item, keyToRender, "1", 0, 200, yPosition);
  });

  return { nodes, edges };
}
