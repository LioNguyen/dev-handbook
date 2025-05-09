// src/components/canvas/AddNode.tsx
import { Handle, NodeProps, Position, XYPosition } from "@xyflow/react";
import { Plus } from "lucide-react";

import { useCanvasHandlers } from "@/domains/canvas/hooks/handlers";

/**
 * Add Node component that appears when a node is selected
 * and allows adding a child node with one click
 */
export default function AddNode({ data, id: _id }: NodeProps) {
  // Safely access data properties with proper type handling
  const parentId = data?.parentId as string; // Cast to string
  const parentPosition = data?.parentPosition as XYPosition;

  // Define source and target positions with correct type handling
  const sourcePosition: Position = (data?.sourcePosition as Position) || Position.Right;
  const targetPosition: Position = (data?.targetPosition as Position) || Position.Left;

  const { createChildNode } = useCanvasHandlers();

  const handleClick = () => {
    if (parentId && parentPosition) {
      createChildNode({
        data: {
          type: "ip",
          name: "New Node",
          value: "New Value",
        },
        parent: {
          id: parentId,
          position: parentPosition,
          sourcePosition,
          targetPosition,
        },
      });
    }
  };

  return (
    <div
      className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer shadow-md transition-colors duration-200"
      onClick={handleClick}
    >
      <Handle position={targetPosition} type="target" className="!left-0" />
      <Handle position={sourcePosition} type="source" className="!right-0" />
      <Plus className="text-white h-6 w-6" />
    </div>
  );
}
