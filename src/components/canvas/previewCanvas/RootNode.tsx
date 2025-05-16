import React, { useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { cn } from "@/shared/utils";
import { useSelectNodes } from "@/domains/canvas/configCanvas/hooks/canvasHandlers";
import { useToggleAddNode } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useToggleAddNode";

type RootNodeProps = {
  data: {
    state?: {
      isParentSelected?: boolean;
      isChildSelected?: boolean;
    };
  };
  id: string;
  selected: boolean;
};

const RootNode: React.FC<RootNodeProps> = ({ data, id, selected }) => {
  const { getNode } = useReactFlow();
  const selectNodes = useSelectNodes();
  const toggleAddNode = useToggleAddNode();

  // Get state info
  const state = data?.state || {};
  const isSelected = state?.isParentSelected || selected;
  const isChildSelected = state?.isChildSelected;

  // Toggle add node based on selection state
  useEffect(() => {
    if (isChildSelected || !isSelected) {
      toggleAddNode?.(id, false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChildSelected, isSelected]);

  // Handle node click - similar to CustomNode
  const handleNodeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Don't trigger if clicking on handles
    if ((e.target as HTMLElement).closest(".react-flow__handle") || (isSelected && getNode(`add-${id}`))) {
      return;
    }

    toggleAddNode?.(id, true);
    selectNodes([id]);
  };

  return (
    <div className="relative" onClick={handleNodeClick}>
      {/* Radiating lines effect */}
      <div className="absolute -z-10 w-48 h-48 -left-12 -top-12 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          <div className="radiate-lines"></div>
        </div>
      </div>

      {/* Hexagonal node with selection state */}
      <div
        className={cn(
          "hexagon",
          isSelected && "ring-2 ring-blue-500",
          "transition-all duration-150",
          "hover:shadow-lg",
        )}
      >
        <div className="hexagon-content font-semibold text-slate-800">Root</div>
      </div>

      {/* Connection handle (only on the right for LR layout) */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-slate-400 !w-3 !h-3 !border-2 !border-white !right-0 !rounded-full !shadow-sm !transition-colors !duration-150 hover:!bg-blue-400"
      />
    </div>
  );
};

export default RootNode;
