// 2. Sidebar.tsx
import React, { DragEvent } from "react";

import styles from "./styles.module.css";

/**
 * Sidebar Component - Contains draggable node templates
 * Users can drag these templates onto the flow diagram to create new connections
 */
function Sidebar() {
  /**
   * Sets up data transfer when starting to drag a node from sidebar
   * @param nodeData Data to associate with the dragged node
   * @returns Event handler function
   */
  const onDragStart = (nodeData: any) => (event: DragEvent) => {
    console.log("Started dragging node from sidebar", nodeData);

    // Fix for Node B and Node C which were missing the nodeData parameter
    const dataToTransfer = nodeData || {};

    const dataString = JSON.stringify(dataToTransfer);
    event.dataTransfer.setData("application/reactflow", dataString);

    // Make the dragged element transparent during drag (optional)
    if (event.dataTransfer.setDragImage) {
      try {
        const draggedEl = event.currentTarget;
        event.dataTransfer.setDragImage(draggedEl, 0, 0);
      } catch (err) {
        console.warn("Failed to set drag image:", err);
      }
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLabel}>
        You can drag nodes from the sidebar and drop them on another node
      </div>
      <div>
        {/* Node templates that can be dragged */}
        <div
          onDragStart={onDragStart({ type: "Node A" })}
          draggable
          className={styles.sidebarNode}
        >
          Node A
        </div>
        <div
          onDragStart={onDragStart({ type: "Node B" })}
          draggable
          className={styles.sidebarNode}
        >
          Node B
        </div>
        <div
          onDragStart={onDragStart({ type: "Node C" })}
          draggable
          className={styles.sidebarNode}
        >
          Node C
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
