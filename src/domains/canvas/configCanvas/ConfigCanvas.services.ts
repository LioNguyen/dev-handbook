// src/domains/canvas/canvas.services.ts
import { useCallback } from "react";
import { Node, Edge } from "@xyflow/react";

import canvasData from "../data/canvas.json";
import { edges as initialEdges, nodes as initialNodes } from "../data/canvas.data";

export function useConfigCanvasService() {
  // Get initial nodes
  const getInitialNodes = useCallback(() => {
    return initialNodes.map((node) => ({
      ...node,
      // Make sure position is an XYPosition
      position: { x: node.position.x, y: node.position.y },
      // Make sure data is correctly typed
      data: {
        ...node.data,
      },
    }));
  }, []);

  // Get initial edges
  const getInitialEdges = useCallback(() => {
    return initialEdges;
  }, []);

  // Enhanced getNodesAndEdgesFromData function with improved condition checking
  const getNodesAndEdgesFromData = useCallback((keyToRender: any = null) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Use default keys if keyToRender is not provided
    const defaultFormat = {
      node: ["parentLead", "parentLeadValue", "parentLeadType", "value"],
      leaf: {
        node: ["sessionId", "time", "operation", "client"],
        leaf: {
          node: ["additionalDetails", "conditionalAccessStatus", "errorCode", "failureReason", "status"],
          leaf: {},
        },
      },
    };

    const renderConfig = keyToRender || defaultFormat;

    // Node counter and spacing variables
    let nodeCounter = 1;
    const levelSpacing = 200; // Horizontal spacing between levels
    const itemSpacing = 100; // Vertical spacing between items at same level
    const verticalSiblingOffset = 50; // Offset for sibling nodes

    // Track node depths for layout calculations
    const depthMap = new Map<string, number>();

    // Create root node with fixed values
    nodes.push({
      id: "1",
      type: "root", // Keep node type for React Flow
      draggable: false,
      position: { x: 0, y: 0 },
      data: {
        value: "176.96.226.227",
        name: "IP ADDRESS",
        nodeStyle: "starred", // Rename 'type' to 'nodeStyle' to avoid confusion
      },
    });

    const rootId = "1";
    nodeCounter++;

    /**
     * Function to determine the maximum depth of a configuration object
     * This helps us understand how many levels are defined in keyToRender
     */
    const getConfigDepth = (config: any, currentDepth = 0): number => {
      if (!config || typeof config !== "object") return currentDepth;

      // If there's a 'leaf' field, check its depth
      if (config.leaf && Object.keys(config.leaf).length > 0) {
        return getConfigDepth(config.leaf, currentDepth + 1);
      }

      return currentDepth;
    };

    /**
     * Function to check if a config node array has any fields to render
     */
    const hasFieldsToRender = (nodeConfig: any): boolean => {
      if (!nodeConfig || !Array.isArray(nodeConfig) || nodeConfig.length === 0) {
        return false;
      }
      return true;
    };

    // Calculate the maximum depth we should render based on keyToRender
    const maxConfigDepth = getConfigDepth(renderConfig);

    /**
     * Recursive function to process nodes at any depth
     * @param data The data object/array to process
     * @param parentId The ID of the parent node
     * @param level Current tree depth level (1-based, where 1 is the first level after root)
     * @param config Configuration for current level
     * @param indexInParent Index position among siblings
     * @param pathInfo Information about this node's path
     * @param totalSiblingsAtLevel Used for centering calculations
     * @returns void
     */
    const processNodes = (
      data: any,
      parentId: string,
      level: number,
      config: any,
      indexInParent = 0,
      pathInfo: any = {},
      totalSiblingsAtLevel = 1,
    ): void => {
      // Skip if data is null or undefined
      if (data === null || data === undefined) return;

      // Skip processing if we've reached the max depth defined in the config
      if (level > maxConfigDepth) {
        return;
      }

      // Check if the current level has a valid configuration
      if (!config || typeof config !== "object") {
        return;
      }

      // Skip processing ONLY if both node is empty AND leaf is empty or doesn't exist
      if (
        (!config.node || !hasFieldsToRender(config.node)) &&
        (!config.leaf || Object.keys(config.leaf).length === 0)
      ) {
        return;
      }

      // Calculate base position
      const xPos = level * levelSpacing;
      let yPos = indexInParent * itemSpacing - ((totalSiblingsAtLevel - 1) * itemSpacing) / 2;

      // Adjust position based on parent's position if it's not the root
      if (parentId !== rootId && nodes.find((n) => n.id === parentId)) {
        const parentNode = nodes.find((n) => n.id === parentId);
        if (parentNode) {
          yPos += parentNode.position.y;
        }
      }

      // Handle array of data
      if (Array.isArray(data)) {
        // Process each item in the array
        data.forEach((item, index) => {
          // Create a new path info object for this level
          const newPathInfo = { ...pathInfo, arrayIndex: index };

          // Process this item with the same config
          processNodes(item, parentId, level, config, index, newPathInfo, data.length);
        });
        return;
      }

      // We're processing an object at this point
      const currentNodeId = `${nodeCounter++}`;
      const nodeData: Record<string, any> = {};

      // Extract all fields that match the config.node array
      if (config.node && Array.isArray(config.node)) {
        config.node.forEach((key: string) => {
          // Include the key with its value, even if the value is falsy
          if (data[key] !== undefined) {
            nodeData[key] = data[key];
          }
        });
      }

      // Add styling info based on the data
      if (data.parentLeadType) {
        nodeData.parentLeadType = data.parentLeadType;
        nodeData.nodeStyle = getNodeStyleFromLeadType(data.parentLeadType);
      } else if (pathInfo.nodeType === "client") {
        nodeData.parentLeadType = "IP ADDRESS";
        nodeData.nodeStyle = "ip";
      } else if (pathInfo.nodeType === "device") {
        nodeData.parentLeadType = pathInfo.deviceType || "DEVICE";
        nodeData.nodeStyle = getNodeStyleFromLeadType(data.parentLeadType || "");
      } else if (pathInfo.nodeType === "status") {
        nodeData.parentLeadType = "AUTH STATUS";
        nodeData.nodeStyle = getStatusNodeStyle(data.status || "");
      }

      // Add special case handling for common fields to ensure they're included
      // Check if these fields are in the config.node array
      const includeIp = config.node && config.node.includes("ip");
      const includeDeviceId = config.node && config.node.includes("deviceId");
      const includeStatus = config.node && config.node.includes("status");

      if (data.ip && !nodeData.ip && includeIp) nodeData.ip = data.ip;
      if (data.deviceId && !nodeData.deviceId && includeDeviceId) nodeData.deviceId = data.deviceId;
      if (data.status && !nodeData.status && includeStatus) nodeData.status = data.status;

      // Only add the node if we have data to render or we're handling leaf nodes
      // Important: We always add the node even if empty, for proper leaf rendering
      nodes.push({
        id: currentNodeId,
        type: "custom",
        position: { x: xPos, y: yPos },
        data: nodeData,
      });

      // Connect to parent
      edges.push({
        id: `e${parentId}-${currentNodeId}`,
        source: parentId,
        target: currentNodeId,
      });

      // Track node depth
      depthMap.set(currentNodeId, level);

      // Check if we should process further levels (leaf)
      // We process leaf data regardless if the leaf is empty or not
      if (config.leaf && level < maxConfigDepth) {
        const nextConfig = config.leaf;

        // Handle client object specially - for proper display at next level
        if (data.result && data.result.client && nextConfig.node && nextConfig.node.includes("client")) {
          const clientNodeId = `${nodeCounter++}`;
          const clientData: Record<string, any> = {
            parentLeadType: "IP ADDRESS",
            nodeStyle: "ip",
          };

          // Add client fields based on config
          if (nextConfig.node) {
            // Get all client fields that are in the nextConfig.node array
            Object.keys(data.result.client).forEach((key) => {
              if (nextConfig.node.includes(key)) {
                clientData[key] = data.result.client[key];
              }
            });
          }

          // Include IP by default if it's in the client data and the config
          if (data.result.client.ip && !clientData.ip && nextConfig.node.includes("ip")) {
            clientData.ip = data.result.client.ip;
          }

          // Add client node
          nodes.push({
            id: clientNodeId,
            type: "custom",
            position: {
              x: xPos + levelSpacing,
              y: yPos,
            },
            data: clientData,
          });

          // Connect to parent
          edges.push({
            id: `e${currentNodeId}-${clientNodeId}`,
            source: currentNodeId,
            target: clientNodeId,
          });

          // Track node depth
          depthMap.set(clientNodeId, level + 1);

          // Process client's result if we have another level to process
          // Note: We process leaf data even if it's empty
          if (data.result.result && nextConfig.leaf && level + 1 < maxConfigDepth) {
            processNodes(data.result.result, clientNodeId, level + 2, nextConfig.leaf, 0, { nodeType: "status" }, 1);
          }
        }

        // Handle device object specially
        if (data.result && data.result.device && nextConfig.node && nextConfig.node.includes("device")) {
          const deviceNodeId = `${nodeCounter++}`;
          const deviceData: Record<string, any> = {
            parentLeadType: getDeviceNodeType(data.parentLeadType || ""),
            nodeStyle: getNodeStyleFromLeadType(data.parentLeadType || ""),
          };

          // Add device fields based on config
          if (nextConfig.node) {
            // Get all device fields that are in the nextConfig.node array
            Object.keys(data.result.device).forEach((key) => {
              if (nextConfig.node.includes(key)) {
                deviceData[key] = data.result.device[key];
              }
            });
          }

          // Include deviceId by default if it's in the device data and the config
          if (data.result.device.deviceId && !deviceData.deviceId && nextConfig.node.includes("deviceId")) {
            deviceData.deviceId = data.result.device.deviceId;
          }

          // Add device node
          nodes.push({
            id: deviceNodeId,
            type: "custom",
            position: {
              x: xPos + levelSpacing,
              y: yPos + verticalSiblingOffset,
            },
            data: deviceData,
          });

          // Connect to parent
          edges.push({
            id: `e${currentNodeId}-${deviceNodeId}`,
            source: currentNodeId,
            target: deviceNodeId,
          });

          // Track node depth
          depthMap.set(deviceNodeId, level + 1);
        }

        // Process general result data if it exists
        if (data.result) {
          // For array results, process each item
          if (Array.isArray(data.result)) {
            processNodes(data.result, currentNodeId, level + 1, nextConfig, 0, {}, data.result.length);
          }
          // For object results (that aren't the special client/device cases)
          else if (
            typeof data.result === "object" &&
            !data.result.client &&
            !data.result.device &&
            !Array.isArray(data.result)
          ) {
            processNodes(data.result, currentNodeId, level + 1, nextConfig, 0, { nodeType: "status" }, 1);
          }
        }
      }
    };

    // Start processing from the root level data
    processNodes(canvasData, rootId, 1, renderConfig, 0, {}, canvasData.length);

    return { nodes, edges };
  }, []);

  // Helper functions remain unchanged
  const getStatusNodeStyle = (status: string) => {
    if (status === "Succeeded") return "success";
    if (status === "Failed") return "error";
    if (status === "InProgress" || status === "Warning") return "warning";
    return "info";
  };

  const getNodeStyleFromLeadType = (leadType: string) => {
    if (!leadType) return "ip";
    if (leadType.includes("MICROSOFT") || leadType.includes("AZURE")) {
      return "microsoft";
    } else if (leadType.includes("AWS")) {
      return "aws";
    } else if (leadType.includes("GCP")) {
      return "gcp";
    } else if (leadType.includes("SSH") || leadType.includes("TOKEN")) {
      return "key";
    } else {
      return "ip";
    }
  };

  const getDeviceNodeType = (leadType: string) => {
    if (!leadType) return "DEVICE ID";
    if (leadType.includes("MICROSOFT") || leadType.includes("AZURE")) {
      return "MICROSOFT ENTRA DEVICE ID";
    } else if (leadType.includes("AWS")) {
      return "AWS DEVICE";
    } else if (leadType.includes("GCP")) {
      return "GCP DEVICE";
    } else {
      return "DEVICE ID";
    }
  };

  return {
    getInitialNodes,
    getInitialEdges,
    getNodesAndEdgesFromData,
  };
}

export default useConfigCanvasService;
