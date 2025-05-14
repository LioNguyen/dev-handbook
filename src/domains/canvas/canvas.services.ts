// src/domains/canvas/canvas.services.ts
import { useCallback } from "react";
import { Node, Edge } from "@xyflow/react";

import canvasData from "./data/canvas.json";
import { edges as initialEdges, nodes as initialNodes } from "./data/canvas.data";

export function useCanvasService() {
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
  const getNodesAndEdgesFromData = useCallback((keyToRender = null) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Use default keys if keyToRender is not provided
    const renderConfig = keyToRender || {
      parentLead: true,
      parentLeadValue: true,
      parentLeadType: true,
      value: false,
      result: {
        sessionId: true,
        time: false,
        operation: false,
        client: true,
        result: {
          additionalDetails: false,
          conditionalAccessStatus: true,
          errorCode: false,
          failureReason: false,
          status: true,
        },
      },
    };

    // Node counter and spacing variables
    let nodeCounter = 1;
    const levelSpacing = 200; // Horizontal spacing between levels
    const itemSpacing = 100; // Vertical spacing between items at same level
    const verticalSiblingOffset = 50; // Offset for sibling nodes

    // Track node depths for layout calculations
    const depthMap = new Map();

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
    const getConfigDepth = (config, currentDepth = 0) => {
      if (!config || typeof config !== "object") return currentDepth;

      // If there's a 'result' field, check its depth
      if (config.result) {
        return getConfigDepth(config.result, currentDepth + 1);
      }

      return currentDepth;
    };

    /**
     * Function to check if a config object has any true values
     * Returns false if all keys in the object are set to false
     */
    const hasEnabledFields = (config) => {
      if (!config || typeof config !== "object") return false;

      // Check direct boolean values
      const directFields = Object.entries(config).filter(
        ([key, value]) => key !== "result" && typeof value === "boolean",
      );

      if (directFields.some(([_, value]) => value === true)) {
        return true;
      }

      // Check nested objects
      for (const [key, value] of Object.entries(config)) {
        if (key === "result" && typeof value === "object") {
          if (hasEnabledFields(value)) {
            return true;
          }
        } else if (typeof value === "object" && value !== null) {
          if (hasEnabledFields(value)) {
            return true;
          }
        }
      }

      return false;
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
      data,
      parentId,
      level,
      config,
      indexInParent = 0,
      pathInfo = {},
      totalSiblingsAtLevel = 1,
    ) => {
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

      // Skip processing if all fields in the config are set to false
      if (!hasEnabledFields(config)) {
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
        // Process each item in the array, but only if we have a valid config for this level
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
      const nodeData = {};

      // Extract all basic fields that match the config
      Object.keys(data).forEach((key) => {
        // Skip processing 'result' field here - we'll handle it separately
        if (key === "result") return;

        // Check if this key should be included based on config
        if (config[key] === true) {
          // Include the key with its value, even if the value is falsy
          // CustomNode will display these with "-" to indicate empty/falsy values
          nodeData[key] = data[key];
        }
      });

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
      if (data.ip && !nodeData.ip && config.ip !== false) nodeData.ip = data.ip;
      if (data.deviceId && !nodeData.deviceId && config.deviceId !== false) nodeData.deviceId = data.deviceId;
      if (data.status && !nodeData.status && config.status !== false) nodeData.status = data.status;

      // Add this node
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

      // Check if we should process further results
      // Only process if we haven't reached max depth, have a result config, and the result config has enabled fields
      if (data.result && level < maxConfigDepth && config.result && hasEnabledFields(config.result)) {
        let nextConfig = config.result;

        // Handle client object specially - for proper display at next level
        if (data.result.client && nextConfig.client) {
          const clientNodeId = `${nodeCounter++}`;
          const clientData = {
            parentLeadType: "IP ADDRESS",
            nodeStyle: "ip",
          };

          // Add client fields based on config
          if (nextConfig.client) {
            if (typeof nextConfig.client === "object") {
              // Include specific client fields
              Object.keys(data.result.client).forEach((key) => {
                if (nextConfig.client[key] === true) {
                  clientData[key] = data.result.client[key];
                }
              });
            } else if (nextConfig.client === true) {
              // Include all client fields
              Object.keys(data.result.client).forEach((key) => {
                clientData[key] = data.result.client[key];
              });
            }
          }

          // Include IP by default
          if (data.result.client.ip && !clientData.ip) {
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

          // Process client's result if we haven't reached max depth and config has next level with enabled fields
          if (
            data.result.result &&
            level + 1 < maxConfigDepth &&
            nextConfig.result &&
            hasEnabledFields(nextConfig.result)
          ) {
            processNodes(data.result.result, clientNodeId, level + 2, nextConfig.result, 0, { nodeType: "status" }, 1);
          }
        }

        // Handle device object specially
        if (data.result.device && nextConfig.device) {
          const deviceNodeId = `${nodeCounter++}`;
          const deviceData = {
            parentLeadType: getDeviceNodeType(data.parentLeadType || ""),
            nodeStyle: getNodeStyleFromLeadType(data.parentLeadType || ""),
          };

          // Add device fields based on config
          if (nextConfig.device) {
            if (typeof nextConfig.device === "object") {
              // Include specific device fields
              Object.keys(data.result.device).forEach((key) => {
                if (nextConfig.device[key] === true) {
                  deviceData[key] = data.result.device[key];
                }
              });
            } else if (nextConfig.device === true) {
              // Include all device fields
              Object.keys(data.result.device).forEach((key) => {
                deviceData[key] = data.result.device[key];
              });
            }
          }

          // Include deviceId by default
          if (data.result.device.deviceId && !deviceData.deviceId) {
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

        // Process general result data if it's not already handled as client/device
        // Handle both object and array types
        if (data.result !== data.result.client && data.result !== data.result.device) {
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
