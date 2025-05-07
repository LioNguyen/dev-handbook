import React, { DragEvent } from "react";

/**
 * Handles the drag start event for sidebar nodes
 *
 * @param event - The drag event object
 * @param nodeType - The type of node being dragged (input, default, output)
 */
const onDragStart = (event: DragEvent, nodeType: string) => {
  console.log(`Started dragging a ${nodeType} node`);

  // Store the node type in the drag data transfer object
  // This will be read by the ReactFlow component on drop
  event.dataTransfer.setData("application/reactflow", nodeType);

  // Set the allowed effect to move (changes cursor appearance)
  event.dataTransfer.effectAllowed = "move";

  // Optional: You could also set a drag image here
  // event.dataTransfer.setDragImage(element, xOffset, yOffset);
};

/**
 * Sidebar Component
 *
 * Provides draggable node templates that users can drag onto the flow canvas
 * to create new nodes of different types (input, default, output).
 */
const Sidebar = () => {
  console.log("Rendering Sidebar component");

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>

      {/* Input Node Template */}
      <div
        className="react-flow__node-input"
        onDragStart={(event: DragEvent) => onDragStart(event, "input")}
        draggable
        onMouseOver={() => console.log("Hovering over Input Node template")}
      >
        Input Node
      </div>

      {/* Default Node Template */}
      <div
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, "default")}
        draggable
        onMouseOver={() => console.log("Hovering over Default Node template")}
      >
        Default Node
      </div>

      {/* Output Node Template */}
      <div
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, "output")}
        draggable
        onMouseOver={() => console.log("Hovering over Output Node template")}
      >
        Output Node
      </div>
    </aside>
  );
};

export default Sidebar;
