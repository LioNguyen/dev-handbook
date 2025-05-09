// src/components/canvas/CustomNode.tsx
import { Handle, NodeProps, Position } from "@xyflow/react";
import { ChevronDown, ChevronUp, CircleAlert, Info, Star, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useCanvas } from "@/domains/canvas";
import { useCanvasHandlers } from "@/domains/canvas/hooks/handlers";
import { Button } from "@designSystem/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/ui/popover";
import "./styles.css";

/**
 * Custom node component with enhanced functionality
 */
export default function CustomNode({ data, id, sourcePosition, targetPosition, selected, dragging }: NodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { highlightedNodeId } = useCanvas();

  // Get handlers from the hook
  const { toggleNodeExpansion, deleteNode, highlightNodes, toggleAddNode } = useCanvasHandlers();

  // Destructure data props with proper type safety
  const {
    type = "ip", // Default type
    name = "",
    value,
    isDragging = false,
    isDropTarget = false,
    expandable = false,
    expanded = false,
  } = data || {};

  // Determine if this node is highlighted
  const isHighlighted = highlightedNodeId === id;

  useEffect(() => {
    toggleAddNode(id, isHighlighted);
  }, [isHighlighted]);

  // Close popover when node is selected or dragging
  useEffect(() => {
    if (selected || dragging) {
      setIsOpen(false);
    }
  }, [selected, dragging]);

  /**
   * Toggles node expansion state using the shared handler
   */
  const handleToggleExpand = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsOpen(false);

    if (expandable) {
      toggleNodeExpansion(id);
    }
  };

  /**
   * Shows details for the node
   */
  const showDetails = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsOpen(false);
    // Implement show details logic
    alert(`Node Details: ${id}`);
  };

  /**
   * Deletes the current node
   */
  const handleDeleteNode = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsOpen(false);
    deleteNode(id);
  };

  /**
   * Highlights this node and all its children
   */
  const handleNodeClick = () => {
    if (!expanded) {
      toggleNodeExpansion(id);
    }

    // Call the parent-provided highlightNodes function
    if (highlightNodes) {
      highlightNodes(id);
    }
  };

  // Get the icon based on the node type
  const getNodeIcon = () => {
    if (type === "starred") {
      return <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
    }

    return <CircleAlert className="h-4 w-4 text-blue-500" />;
  };

  // Determine any special styling for the node
  const getNodeStyle = () => {
    if (dragging || isDragging) {
      return "bg-blue-100 opacity-70 cursor-grabbing";
    } else if (isDropTarget) {
      return "bg-blue-100 outline-2 outline-dashed outline-blue-500";
    } else if (isHighlighted) {
      return "bg-blue-100 outline-2 outline-pink-500";
    } else {
      return "bg-blue-100";
    }
  };

  return (
    <div
      className={`w-[300px] shadow-md rounded-full px-4 py-2 relative transition-all duration-150 flex items-center ${getNodeStyle()}`}
      onClick={(e) => {
        e.stopPropagation();

        // Don't trigger if clicking on buttons or handles
        if ((e.target as HTMLElement).closest("button, .react-flow__handle")) {
          return;
        }

        // Highlight this node and its children
        handleNodeClick();
      }}
    >
      {/* Left icon */}
      <div className="flex-shrink-0 p-1 rounded-full mr-3">{getNodeIcon()}</div>

      {/* Content */}
      <div className="flex-grow">
        <div className="font-mono text-sm font-medium">
          {value !== undefined && value !== null ? String(value) : ""}
        </div>
        <div className="font-mono text-xs text-gray-500 uppercase">
          {name !== undefined && name !== null ? String(name) : ""}
        </div>
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
            {Boolean(expandable) && (
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start text-sm"
                onClick={handleToggleExpand}
                disabled={!expandable}
              >
                {expanded ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" /> Collapse
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" /> Expand
                  </>
                )}
              </Button>
            )}
            <Button variant="ghost" size="sm" className="flex justify-start text-sm" onClick={showDetails}>
              <Info className="mr-2 h-4 w-4" /> Show Details
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleDeleteNode}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Node
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Show drag status indicator if the node is being dragged */}
      {(Boolean(isDragging) || Boolean(dragging)) && (
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
  );
}
