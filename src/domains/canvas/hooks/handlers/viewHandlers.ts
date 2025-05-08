// src/domains/canvas/hooks/handlers/viewHandlers.ts
import { useCallback } from "react";
import { useCanvas } from "../../canvas.context";

export function useViewHandlers() {
  const { nodes, edges, reactFlowInstance } = useCanvas();

  /**
   * Zoom in
   */
  const zoomIn = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomIn();
    }
  }, [reactFlowInstance]);

  /**
   * Zoom out
   */
  const zoomOut = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomOut();
    }
  }, [reactFlowInstance]);

  /**
   * Fit view to show all nodes
   */
  const fitView = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2, duration: 300 });
    }
  }, [reactFlowInstance]);

  /**
   * Enhanced function to fit view focusing on a specific node and its connections
   */
  const fitViewForNode = useCallback(
    (nodeId: string) => {
      if (reactFlowInstance) {
        // Get the node
        const node = nodes.find((n) => n.id === nodeId);

        if (node) {
          // Get all connected nodes
          const connectedNodes = [node];

          // Add parent node
          const parentEdge = edges.find((e) => e.target === nodeId);
          if (parentEdge) {
            const parentNode = nodes.find((n) => n.id === parentEdge.source);
            if (parentNode) {
              connectedNodes.push(parentNode);
            }
          }

          // Add child nodes
          edges.forEach((edge) => {
            if (edge.source === nodeId) {
              const childNode = nodes.find((n) => n.id === edge.target);
              if (childNode) {
                connectedNodes.push(childNode);
              }
            }
          });

          // Calculate bounding box
          if (connectedNodes.length > 0) {
            // Convert nodes to the format expected by fitView
            const nodeElements = connectedNodes.map((n) => ({
              id: n.id,
              position: n.position,
              width: 300,
              height: 50,
            }));

            reactFlowInstance.fitView({
              padding: 0.5,
              duration: 500,
              nodes: nodeElements,
            });
          } else {
            reactFlowInstance.fitView({ padding: 0.2, duration: 500 });
          }
        } else {
          reactFlowInstance.fitView({ padding: 0.2, duration: 500 });
        }
      }
    },
    [reactFlowInstance, nodes, edges],
  );

  /**
   * Function to center view on a specific node
   */
  const centerViewOnNode = useCallback(
    (nodeId: string) => {
      if (reactFlowInstance) {
        const node = nodes.find((n) => n.id === nodeId);
        if (node && node.position) {
          reactFlowInstance.setCenter(node.position.x, node.position.y, {
            duration: 500,
            zoom: reactFlowInstance.getZoom(),
          });
        }
      }
    },
    [reactFlowInstance, nodes],
  );

  return {
    zoomIn,
    zoomOut,
    fitView,
    fitViewForNode,
    centerViewOnNode,
  };
}
