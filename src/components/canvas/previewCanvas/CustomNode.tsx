import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { CircleAlert, Edit, InfoIcon, Star, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/shared/utils";
import { Button } from "@designSystem/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@designSystem/components/ui/tooltip";
import "../styles.css";
import { useSelectNodes } from "@/domains/canvas/previewCanvas/hooks/canvasHandlers";
import { useToggleAddNode } from "@/domains/canvas/previewCanvas/hooks/nodeHandlers/useToggleAddNode";
import { useNodesDelete } from "@/domains/canvas/previewCanvas/hooks/nodeHandlers/useNodesDelete";
import NodeDetailSheet from "./NodeDetailSheet";

/**
 * Custom node component with enhanced functionality and modern attractive UI
 */
export default function CustomNode({ data, id, sourcePosition, targetPosition, selected, dragging }: NodeProps) {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isInfoPopoverOpen, setIsInfoPopoverOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const { getNode } = useReactFlow();
  const selectNodes = useSelectNodes();
  const toggleAddNode = useToggleAddNode();
  const deleteNodes = useNodesDelete();

  // Get node style for styling (renamed from 'type' to avoid conflicts)
  const nodeStyle = data?.nodeStyle || "ip";
  const isDropTarget = data?.isDropTarget || false;
  const state: any = data?.state || {};

  const isSelected = state?.isParentSelected || selected;
  const isChildSelected = state?.isChildSelected;

  useEffect(() => {
    if (dragging || isChildSelected || !isSelected) {
      toggleAddNode?.(id, false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, isChildSelected, isSelected]);

  // Close popovers when node is selected or dragging
  useEffect(() => {
    if (dragging || isSelected) {
      setIsActionMenuOpen(false);
      setIsInfoPopoverOpen(false);
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

    toggleAddNode?.(id, true);
    selectNodes([id]);
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
   * Toggle info popover
   */
  const toggleInfoPopover = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    setIsActionMenuOpen(false);
    setIsInfoPopoverOpen(!isInfoPopoverOpen);
  };

  // Get the icon based on the node style
  const getNodeIcon = () => {
    switch (nodeStyle) {
      case "microsoft":
        return <CircleAlert className="h-4 w-4 text-blue-600 fill-blue-100" />;
      case "starred":
        return <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />;
      case "aws":
        return <CircleAlert className="h-4 w-4 text-orange-500" />;
      case "gcp":
        return <CircleAlert className="h-4 w-4 text-red-500" />;
      case "key":
        return <CircleAlert className="h-4 w-4 text-purple-600" />;
      case "success":
        return <CircleAlert className="h-4 w-4 text-green-600 fill-green-100" />;
      case "error":
        return <CircleAlert className="h-4 w-4 text-red-600 fill-red-100" />;
      case "warning":
        return <CircleAlert className="h-4 w-4 text-yellow-600 fill-yellow-100" />;
      case "info":
        return <CircleAlert className="h-4 w-4 text-blue-600 fill-blue-100" />;
      default:
        return <CircleAlert className="h-4 w-4 text-green-600" />;
    }
  };

  // Get node styling based on type
  const getNodeStyling = () => {
    let bgClass = "";
    let borderClass = "";
    let iconBgClass = "";

    switch (nodeStyle) {
      case "microsoft":
        bgClass = "bg-blue-50";
        iconBgClass = "bg-blue-100 text-blue-600";
        break;
      case "starred":
        bgClass = "bg-yellow-50";
        iconBgClass = "bg-yellow-100 text-yellow-600";
        break;
      case "aws":
        bgClass = "bg-orange-50";
        iconBgClass = "bg-orange-100 text-orange-600";
        break;
      case "gcp":
        bgClass = "bg-red-50";
        iconBgClass = "bg-red-100 text-red-600";
        break;
      case "key":
        bgClass = "bg-purple-50";
        iconBgClass = "bg-purple-100 text-purple-600";
        break;
      case "success":
        bgClass = "bg-green-50";
        iconBgClass = "bg-green-100 text-green-600";
        break;
      case "error":
        bgClass = "bg-red-50";
        iconBgClass = "bg-red-100 text-red-600";
        break;
      case "warning":
        bgClass = "bg-yellow-50";
        iconBgClass = "bg-yellow-100 text-yellow-600";
        break;
      case "info":
        bgClass = "bg-blue-50";
        iconBgClass = "bg-blue-100 text-blue-600";
        break;
      default:
        bgClass = "bg-slate-50";
        iconBgClass = "bg-slate-100 text-slate-600";
    }

    // Add selection state
    if (isSelected) {
      borderClass = "ring-2 ring-blue-500";
    } else if (isDropTarget) {
      borderClass = "outline-2 outline-dashed outline-blue-500";
    }

    return { bgClass, borderClass, iconBgClass };
  };

  // Get all data keys excluding UI metadata
  const getDataKeys = () => {
    const metaKeys = ["state", "isDropTarget", "onEditNode", "nodeStyle"];
    return Object.keys(data || {}).filter((key) => !metaKeys.includes(key));
  };

  // Format value for display, showing "-" for falsy values
  const formatValueForDisplay = (value: any) => {
    if (value === null || value === undefined || value === "" || value === false) {
      return "-";
    }

    // Handle special cases
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  // Format key name for display
  const formatKeyForDisplay = (key: string) => {
    // Convert camelCase to Title Case with spaces
    return (
      key.charAt(0).toUpperCase() +
      key
        .slice(1)
        .replace(/([A-Z])/g, " $1")
        .trim()
    );
  };

  // Get visible data entries, sorted by relevance
  const getNodeDataEntries = () => {
    const dataKeys = getDataKeys();
    if (dataKeys.length === 0) return [];

    // Create array of [key, value] entries
    return dataKeys.map((key) => ({
      key,
      formattedKey: formatKeyForDisplay(key),
      value: data[key],
      formattedValue: formatValueForDisplay(data[key]),
      // If the key is uppercase, it's likely a type/category indicator
      isLabel: /^[A-Z_]+$/.test(key),
    }));
  };

  // Get visible data entries for node display
  const dataEntries = getNodeDataEntries();

  // Primary value is the first non-label entry value
  const primaryEntry: any =
    dataEntries.find((entry) => !entry.isLabel && entry.formattedValue !== "-") ||
    (dataEntries.length > 0 ? dataEntries[0] : { formattedKey: "Unknown", formattedValue: "Unknown" });

  // Secondary value is the first label entry, if any
  const secondaryEntry = dataEntries.find(
    (entry) => entry.key !== primaryEntry.key && (entry.isLabel || entry.key.toLowerCase().includes("type")),
  );

  // All entries that aren't the primary or secondary
  const additionalEntries = dataEntries.filter(
    (entry) => entry.key !== primaryEntry.key && (!secondaryEntry || entry.key !== secondaryEntry.key),
  );

  const hasMore = additionalEntries.length > 0;
  const { bgClass, borderClass, iconBgClass } = getNodeStyling();

  // Fix for the TypeScript error
  const renderTooltipContent = (content: React.ReactNode) => {
    return <div>{content}</div>;
  };

  return (
    <>
      <TooltipProvider>
        <div
          className={cn(
            "rounded-full px-4 py-2.5 w-[320px] transition-all duration-150 flex items-center",
            bgClass,
            "shadow-md border border-white/60",
            dragging ? "opacity-70 cursor-grabbing" : "hover:shadow-lg",
            borderClass,
          )}
          onClick={handleNodeClick}
          onDoubleClick={handleEditNode}
        >
          {/* Left icon with modern styling */}
          <div
            className={cn(
              "flex-shrink-0 p-2 rounded-full mr-3.5 flex items-center justify-center",
              iconBgClass,
              "shadow-sm border border-white/80",
            )}
          >
            {getNodeIcon()}
          </div>

          {/* Content - Two lines with tooltips */}
          <div className="flex-grow flex flex-col justify-center overflow-hidden">
            {/* Primary value with tooltip */}
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="font-sans text-sm font-semibold truncate text-gray-800">
                  {primaryEntry.formattedValue}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs bg-slate-900 text-white border-0 shadow-xl rounded-md">
                {renderTooltipContent(primaryEntry.formattedValue)}
              </TooltipContent>
            </Tooltip>

            {/* Secondary value with tooltip if available */}
            {secondaryEntry && (
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <div className="font-sans text-xs text-gray-500 uppercase truncate mt-0.5 tracking-wider">
                    {secondaryEntry.formattedValue}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-slate-900 text-white border-0 shadow-xl rounded-md"
                >
                  {renderTooltipContent(secondaryEntry.formattedValue)}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Info button - shows all data in popover next to node */}
          {hasMore && (
            <Popover open={isInfoPopoverOpen} onOpenChange={setIsInfoPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "p-1 h-7 w-7 mr-1.5 rounded-full",
                    isInfoPopoverOpen
                      ? "bg-slate-200 text-slate-800"
                      : "hover:bg-slate-100 text-slate-500 hover:text-slate-700",
                  )}
                  onClick={toggleInfoPopover}
                  aria-label="View all data"
                >
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 p-0 overflow-hidden shadow-lg rounded-lg border border-slate-200"
                side="right"
                align="start"
                sideOffset={10}
              >
                <div className="bg-white divide-y divide-slate-100">
                  <div className="px-4 py-3 bg-slate-50">
                    <div className="text-sm font-semibold text-slate-800">{primaryEntry.formattedValue}</div>
                    {secondaryEntry && (
                      <div className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">
                        {secondaryEntry.formattedValue}
                      </div>
                    )}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    <table className="w-full table-auto text-sm">
                      <tbody>
                        {dataEntries.map((entry, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                            <td className="py-2 px-4 font-medium text-slate-700">{entry.formattedKey}:</td>
                            <td className="py-2 px-4 font-mono break-all">
                              {entry.formattedValue === "-" ? (
                                <span className="text-slate-400">-</span>
                              ) : (
                                <span className="text-slate-800">{entry.formattedValue}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Action menu trigger with clean styling */}
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

          {/* Flow handles with improved styling - positioned for rounded-full node */}
          <Handle
            position={targetPosition || Position.Left}
            type="target"
            className="!bg-slate-400 !w-3 !h-3 !border-2 !border-white !left-0 !rounded-full !shadow-sm !transition-colors !duration-150 hover:!bg-blue-400"
          />
          <Handle
            position={sourcePosition || Position.Right}
            type="source"
            className="!bg-slate-400 !w-3 !h-3 !border-2 !border-white !right-0 !rounded-full !shadow-sm !transition-colors !duration-150 hover:!bg-blue-400"
          />

          {/* Show drag status indicator if the node is being dragged */}
          {Boolean(dragging) && !isChildSelected && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap shadow-md">
              Drag onto another node
            </div>
          )}

          {/* Show drop target indicator */}
          {Boolean(isDropTarget) && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap shadow-md">
              Drop to make child
            </div>
          )}

          {/* Small indicator that shows there is more data */}
          {hasMore && !isInfoPopoverOpen && (
            <div className="absolute -bottom-3 right-1/3 -translate-x-1/2">
              <div className="text-[11px] text-slate-600 whitespace-nowrap bg-white rounded-full px-3 py-0.5 shadow-sm border border-slate-100 font-medium">
                +{additionalEntries.length} more
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>

      {/* Integrated NodeDetailSheet for direct editing */}
      <NodeDetailSheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen} nodeId={id} />
    </>
  );
}
