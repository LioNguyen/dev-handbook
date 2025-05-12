// src/components/canvas/AddNode.tsx
import { Handle, NodeProps, Position } from "@xyflow/react";
import { Plus } from "lucide-react";
import { useState } from "react";

import NodeDetailSheet from "../sheet/NodeDetailSheet";

export default function AddNode({ id, data }: NodeProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  // Extract parent ID from the add node ID (format: add-{parentId})
  const parentId = id.startsWith("add-") ? id.substring(4) : (data?.parentId as string);
  // Safely access data properties with proper type handling

  // Define source and target positions with correct type handling
  const sourcePosition: Position = (data?.sourcePosition as Position) || Position.Right;
  const targetPosition: Position = (data?.targetPosition as Position) || Position.Left;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSheetOpen(true);
  };

  return (
    <>
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

      {/* Node detail sheet for creating child nodes */}
      <NodeDetailSheet open={sheetOpen} onOpenChange={setSheetOpen} parentId={parentId} />
    </>
  );
}
