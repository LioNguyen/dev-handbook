// src/components/canvas/CustomNode.tsx
import { Handle, NodeProps, Position } from "@xyflow/react";
import { CircleAlert, Edit, Star, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useCanvas } from "@/domains/canvas";
import { useCanvasHandlers } from "@/domains/canvas/hooks/handlers";
import { cn } from "@/shared/utils";
import { Button } from "@designSystem/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@designSystem/components/ui/tooltip";
import "../styles.css";

/**
 * Custom node component with enhanced functionality
 */
export default function CustomNode({ data, id, sourcePosition, targetPosition, selected, dragging }: NodeProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Get handlers from the hook
  const { reactFlowInstance } = useCanvas();
  const { toggleAddNode, handleNodesDelete } = useCanvasHandlers();

  // Destructure data props with proper type safety
  const {
    type = "ip", // Default type
    name = "",
    value,
    isDropTarget = false,
    state = {},
    onEditNode, // Edit node handler passed from MainCanvas
  } = data || {};

  const nodeState: any = {
    ...(state || {}),
  };
  const isSelected = nodeState?.isParentSelected || selected;
  const isChildSelected = nodeState?.isChildSelected;

  useEffect(() => {
    if (dragging || isChildSelected || !isSelected) {
      toggleAddNode(id, false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, isChildSelected, isSelected]);

  // Close popover when node is selected or dragging
  useEffect(() => {
    if (dragging || isSelected) {
      setIsOpen(false);
    }
  }, [dragging, isSelected]);

  /**
   * Handle node click
   */
  const handleNodeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Don't trigger if clicking on buttons or handles
    if (
      (e.target as HTMLElement).closest("button, .react-flow__handle") ||
      (isSelected && reactFlowInstance?.getNode(`add-${id}`))
    ) {
      return;
    }

    toggleAddNode(id, true);
    reactFlowInstance?.selectNodes([id]);
  };

  /**
   * Opens the edit node sheet using the passed handler
   */
  const handleEditNode = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsOpen(false);

    // Call the handler passed from MainCanvas
    if (onEditNode && typeof onEditNode === "function") {
      onEditNode(id);
    }
  };

  /**
   * Deletes the current node
   */
  const onNodesDelete = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsOpen(false);

    handleNodesDelete([id]);
  };

  // Get the icon based on the node type
  const getNodeIcon = () => {
    if (type === "microsoft") {
      return <CircleAlert className="h-4 w-4 text-blue-600 fill-blue-100" />;
    }

    if (type === "starred") {
      return <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
    }

    return <CircleAlert className="h-4 w-4 text-green-600" />;
  };

  // Format display value and name
  const displayValue = value !== undefined && value !== null ? String(value) : "";
  const displayName = name !== undefined && name !== null ? String(name) : "";

  return (
    <TooltipProvider>
      <div
        className={cn(
          `bg-blue-100 w-[300px] shadow-md rounded-full px-4 py-2 relative transition-all duration-150 flex items-center`,
          dragging ? "bg-blue-100 opacity-70 cursor-grabbing" : "",
          isDropTarget ? "bg-blue-100 outline-2 outline-dashed outline-blue-500" : "",
        )}
        onClick={handleNodeClick}
      >
        {/* Left icon */}
        <div className="flex-shrink-0 p-1 rounded-full mr-3">{getNodeIcon()}</div>

        {/* Content - Two lines with separate tooltips */}
        <div className="flex-grow flex flex-col justify-center overflow-hidden">
          {/* Value with tooltip */}
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div className="font-mono text-sm font-medium truncate">{displayValue}</div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div className="font-mono">{displayValue}</div>
            </TooltipContent>
          </Tooltip>

          {/* Name with tooltip */}
          {displayName && (
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="font-mono text-xs text-gray-500 uppercase truncate">{displayName}</div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="font-mono uppercase">{displayName}</div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <Handle position={targetPosition || Position.Left} type="target" className="!left-0" />
        <Handle position={sourcePosition || Position.Right} type="source" className="!right-0" />

        {/* Action button with popover - styled for the new design */}
        <Popover open={Boolean(isOpen)} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div
              className="ml-2 p-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
            >
              <div className="flex items-center space-x-[2px]">
                <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-gray-500"></div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-1" side="right" align="start">
            <div className="flex flex-col gap-1">
              <Button variant="ghost" size="sm" className="flex justify-start text-sm" onClick={handleEditNode}>
                <Edit className="mr-2 h-4 w-4" /> Edit Node
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={onNodesDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Node
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Show drag status indicator if the node is being dragged */}
        {Boolean(dragging) && !isChildSelected && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap">
            Drag onto another node
          </div>
        )}

        {/* Show drop target indicator */}
        {Boolean(isDropTarget) && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap">
            Drop to make child
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
