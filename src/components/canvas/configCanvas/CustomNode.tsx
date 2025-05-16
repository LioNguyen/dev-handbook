// src/components/canvas/configCanvas/CustomNode.tsx
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ChevronDown, ChevronUp, CircleAlert, Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useSelectNodes } from "@/domains/canvas/configCanvas/hooks/canvasHandlers";
import { useNodesDelete } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useNodesDelete";
import { useToggleAddNode } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useToggleAddNode";
import { cn } from "@/shared/utils";
import { Button } from "@designSystem/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/ui/popover";
import "../styles.css";
import NodeDetailSheet from "./NodeDetailSheet";

/**
 * Custom node component with multi-line field display
 */
export default function CustomNode({ data, id, sourcePosition, targetPosition, selected, dragging }: NodeProps) {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const { getEdges, getNode } = useReactFlow();
  const selectNodes = useSelectNodes();
  const toggleAddNode = useToggleAddNode();
  const deleteNodes = useNodesDelete();

  // Get state and style info
  const state: any = data?.state || {};
  const isSelected = state?.isParentSelected || selected;
  const isChildSelected = state?.isChildSelected;

  // Extract fields from data (using value array directly)
  const nodeValue = Array.isArray(data?.value) ? data.value : [];
  const hasMultipleFields = nodeValue.length > 1;

  // Determine how many fields to show when collapsed
  const initialVisibleFields = 3;
  const hasMoreFields = nodeValue.length > initialVisibleFields;
  const visibleFields = expanded ? nodeValue : nodeValue.slice(0, initialVisibleFields);

  // Check if this node has any outgoing edges (used as source)
  const hasOutgoingEdges = () => {
    return getEdges().some((edge) => edge.source === id);
  };

  useEffect(() => {
    if (dragging || isChildSelected || !isSelected) {
      toggleAddNode?.(id, false);
      return;
    }
  }, [dragging, isChildSelected, isSelected, toggleAddNode, id]);

  // Close popovers when node is selected or dragging
  useEffect(() => {
    if (dragging || isSelected) {
      setIsActionMenuOpen(false);
    }
  }, [dragging, isSelected]);

  /**
   * Handle node click
   */
  const handleNodeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Don't trigger if clicking on buttons or handles
    if ((e.target as HTMLElement).closest("button, .react-flow__handle") || (isSelected && getNode(`add-${id}`))) {
      return;
    }

    // Always select the node
    selectNodes([id]);

    // Only toggle add node if there are no outgoing edges
    if (!hasOutgoingEdges()) {
      toggleAddNode?.(id, true);
    }
  };

  /**
   * Opens the edit node sheet
   */
  const handleEditNode = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsActionMenuOpen(false);
    setIsEditSheetOpen(true);
  };

  /**
   * Deletes the current node
   */
  const onNodesDelete = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsActionMenuOpen(false);
    deleteNodes([id]);
  };

  /**
   * Toggle expanded/collapsed state for fields
   */
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <>
      <div
        className={cn(
          "rounded-lg px-4 py-3 min-w-[360px] max-w-[600px] transition-all duration-150",
          "bg-white shadow-md",
          "outline-1 outline-dashed outline-slate-300",
          dragging ? "opacity-70 cursor-grabbing" : "hover:shadow-lg",
          isSelected ? "ring-2 ring-blue-500" : "",
        )}
        onClick={handleNodeClick}
      >
        {/* Header with node summary */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="bg-slate-100 rounded-md p-1.5 mr-2">
              <CircleAlert className="h-4 w-4 text-slate-600" />
            </div>
            <h3 className="font-medium text-sm text-slate-800">
              Fields: <span className="font-semibold">{nodeValue.length}</span>
            </h3>
          </div>

          {/* Action menu trigger */}
          <div className="flex items-center gap-2">
            {hasMultipleFields && hasMoreFields && (
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={toggleExpand}>
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            )}

            <Popover open={Boolean(isActionMenuOpen)} onOpenChange={setIsActionMenuOpen}>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    "p-1.5 cursor-pointer rounded-full",
                    isActionMenuOpen ? "bg-slate-200" : "hover:bg-slate-100",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsActionMenuOpen((prev) => !prev);
                  }}
                >
                  <div className="flex items-center space-x-[2px]">
                    <div className="w-[3px] h-[3px] rounded-full bg-slate-500"></div>
                    <div className="w-[3px] h-[3px] rounded-full bg-slate-500"></div>
                    <div className="w-[3px] h-[3px] rounded-full bg-slate-500"></div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-48 p-1 shadow-lg border border-slate-200 rounded-lg bg-white"
                side="right"
                align="start"
                sideOffset={5}
              >
                <div className="flex flex-col gap-0.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex justify-start text-sm h-9 rounded-md hover:bg-slate-50 text-slate-700"
                    onClick={handleEditNode}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit Node
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex justify-start text-sm text-red-600 h-9 rounded-md hover:bg-red-50"
                    onClick={onNodesDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Node
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 my-2"></div>

        {/* Fields list - directly using the value array */}
        <div className="space-y-1.5">
          {visibleFields.map((field, index) => (
            <div key={index} className="flex items-center py-1 px-2 rounded hover:bg-slate-50 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
              <div className="text-slate-800 font-medium">{field}</div>
            </div>
          ))}

          {!expanded && hasMoreFields && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-slate-500 mt-1 h-7 w-full flex justify-center"
              onClick={toggleExpand}
            >
              + {nodeValue.length - initialVisibleFields} more fields
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Flow handles with improved positioning for rectangle node */}
        <Handle
          position={targetPosition || Position.Left}
          type="target"
          className="!bg-slate-400 !w-3 !h-3 !border-2 !border-white !left-0 !top-[50%] !rounded-full !shadow-sm !transition-colors !duration-150 hover:!bg-blue-400"
        />
        <Handle
          position={sourcePosition || Position.Right}
          type="source"
          className="!bg-slate-400 !w-3 !h-3 !border-2 !border-white !right-0 !top-[50%] !rounded-full !shadow-sm !transition-colors !duration-150 hover:!bg-blue-400"
        />
      </div>

      {/* Integrated NodeDetailSheet for direct editing */}
      <NodeDetailSheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen} nodeId={id} />
    </>
  );
}
