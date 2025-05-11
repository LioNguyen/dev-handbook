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

  const { createNode } = useCanvasHandlers();

  const handleClick = () => {
    if (parentId && parentPosition) {
      createNode({
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
      className="relative w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
      onClick={handleClick}
    >
      <Handle position={targetPosition} type="target" className="!opacity-0" />
      <Handle position={sourcePosition} type="source" className="!opacity-0" />

      {/* Outer dashed circle */}
      <div className="absolute inset-0 rounded-full border-2 border-white border-dashed"></div>

      {/* Inner solid circle with plus icon */}
      <div className="w-10 h-10 rounded-full border-1 border-white bg-opacity-20 flex items-center justify-center">
        <Plus className="text-white h-5 w-5" />
      </div>
    </div>
  );
}
