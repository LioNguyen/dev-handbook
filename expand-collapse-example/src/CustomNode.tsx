import React, { MouseEventHandler } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";

import styles from "./styles.module.css";

/**
 * Parameters for the getLabel helper function
 */
type GetLabelParams = {
  expanded: boolean; // Whether the node is currently expanded
  expandable: boolean; // Whether the node has children that can be expanded
};

/**
 * Determines the appropriate label text based on node state
 * @param params Object containing expanded and expandable states
 * @returns String label to display on the node
 */
function getLabel({ expanded, expandable }: GetLabelParams): string {
  console.log("Getting label for node:", { expanded, expandable });

  if (!expandable) {
    return "nothing to expand";
  }

  return expanded ? "Click to collapse ▲" : "Click to expand ▼";
}

/**
 * Custom node component that supports expand/collapse functionality
 * and allows adding child nodes
 */
export default function CustomNode({ data, id, xPos, yPos }: NodeProps) {
  console.log(
    `Rendering CustomNode ${id} at position (${xPos}, ${yPos})`,
    data
  );

  const { addNodes, addEdges } = useReactFlow();

  /**
   * Adds a new child node when the "+ add child node" button is clicked
   * @param evt Mouse event from the click
   */
  const addChildNode: MouseEventHandler = (evt) => {
    console.log(`Adding child node to ${id}`);

    // Prevent the expand/collapse behavior when a new node is added while the
    // node is expanded
    if (data.expanded) {
      console.log("Node is expanded, preventing expand/collapse trigger");
      evt.preventDefault();
      evt.stopPropagation();
    }

    // Generate a unique ID for the new node using timestamp
    const newNodeId = `${id}__${new Date().getTime()}`;
    console.log(`Created new node ID: ${newNodeId}`);

    // Create a new node and connect it to the parent
    addNodes({
      id: newNodeId,
      position: { x: xPos, y: yPos + 100 },
      data: { label: "X" },
    });
    addEdges({ id: `${id}->${newNodeId}`, source: id, target: newNodeId });

    console.log(`Added node ${newNodeId} and connected it to ${id}`);
  };

  // Get the appropriate label based on the node's state
  const label = getLabel(data);

  return (
    <div className={styles.node}>
      <div className={styles.label}>{label}</div>
      <Handle position={Position.Top} type="target" />
      <Handle position={Position.Bottom} type="source" />
      <div className={styles.button} onClick={addChildNode}>
        + add child node
      </div>
    </div>
  );
}
