// 1. CustomNode.tsx
import React, { useState, DragEvent } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import cx from "classnames";

import styles from "./styles.module.css";

/**
 * CustomNode Component - A draggable and droppable node for ReactFlow
 * Handles drag-and-drop interactions and provides connection handles
 */
function CustomNode({ data, sourcePosition, targetPosition }: NodeProps) {
  // State to track if this node is currently an active dropzone
  const [isDropzoneActive, setDropzoneActive] = useState<boolean>(false);

  /**
   * Handler for when an item is dropped on this node
   */
  const onDrop = () => {
    console.log("Item dropped on node:", data.label);
    setDropzoneActive(false);
  };

  /**
   * Handler for dragover event - prevents default to allow drop
   */
  const onDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    // console.log('Dragging over node:', data.label);
  };

  /**
   * Handler for when a dragged item enters this node
   */
  const onDragEnter = () => {
    console.log("Drag entered node:", data.label);
    setDropzoneActive(true);
  };

  /**
   * Handler for when a dragged item leaves this node
   */
  const onDragLeave = () => {
    console.log("Drag left node:", data.label);
    setDropzoneActive(false);
  };

  // Determine node class based on dropzone state
  const className = cx(styles.node, {
    [styles.nodeDropzone]: isDropzoneActive,
  });

  return (
    <div
      className={className}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {/* Connection handles for incoming edges (target) and outgoing edges (source) */}
      <Handle
        className={styles.handle}
        type="target"
        position={targetPosition || Position.Top}
      />
      <Handle
        className={styles.handle}
        type="source"
        position={sourcePosition || Position.Bottom}
      />
      {data.label}
    </div>
  );
}

export default CustomNode;
