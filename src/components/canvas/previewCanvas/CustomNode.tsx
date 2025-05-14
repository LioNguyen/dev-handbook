// src/components/canvas/CustomNode.tsx
import { Handle, NodeProps, Position } from "@xyflow/react";
import { CircleAlert, InfoIcon, Edit, Star, Trash2 } from "lucide-react";
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
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isInfoPopoverOpen, setIsInfoPopoverOpen] = useState(false);

  // Get handlers from the hook
  const { reactFlowInstance } = useCanvas();
  const { toggleAddNode, handleNodesDelete } = useCanvasHandlers();

  // Get node style for styling (renamed from 'type' to avoid conflicts)
  const nodeStyle = data?.nodeStyle || "ip";
  const isDropTarget = data?.isDropTarget || false;
  const state = data?.state || {};
  const onEditNode = data?.onEditNode;

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
    setIsActionMenuOpen(false);

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
    setIsActionMenuOpen(false);
    handleNodesDelete([id]);
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
        return <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
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

  // Get node background color based on style
  const getNodeBackgroundClass = () => {
    switch (nodeStyle) {
      case "microsoft":
        return "bg-blue-100";
      case "starred":
        return "bg-yellow-50";
      case "aws":
        return "bg-orange-50";
      case "gcp":
        return "bg-red-50";
      case "key":
        return "bg-purple-50";
      case "success":
        return "bg-green-50";
      case "error":
        return "bg-red-50";
      case "warning":
        return "bg-yellow-50";
      case "info":
        return "bg-blue-50";
      default:
        return "bg-blue-100";
    }
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

  // Dynamically determine primary display value
  const getPrimaryDisplayValue = () => {
    const dataKeys = getDataKeys();

    // No data case
    if (dataKeys.length === 0) return "Unknown";

    // Common special cases
    if (data.ip) return formatValueForDisplay(data.ip);
    if (data.deviceId) return formatValueForDisplay(data.deviceId);
    if (data.status) {
      const status = formatValueForDisplay(data.status);
      const errorCode = data.errorCode ? ` (${formatValueForDisplay(data.errorCode)})` : "";
      return status + errorCode;
    }
    if (data.value) return formatValueForDisplay(data.value);
    if (data.parentLeadValue) return formatValueForDisplay(data.parentLeadValue);
    if (data.name) return formatValueForDisplay(data.name);

    // Default to first available data
    return formatValueForDisplay(data[dataKeys[0]]);
  };

  // Dynamically determine secondary type label
  const getTypeLabel = () => {
    // First priority: dedicated type field
    if (data.parentLeadType) return data.parentLeadType;

    // If we have parent details, format them
    if (data.parentLead) {
      return typeof data.parentLead === "string" ? data.parentLead.toUpperCase() : "PARENT";
    }

    // Look for other type indicators based on data content
    if (data.ip) return "IP ADDRESS";
    if (data.deviceId) return "DEVICE";
    if (data.status) return "STATUS";

    // If no good type label found
    return "";
  };

  // Get key-value pairs for additional data display
  const getKeyValuePairs = () => {
    const pairs: { key: string; value: string }[] = [];
    const dataKeys = getDataKeys();

    // Skip primary and secondary values from additional data display
    const primaryValue = getPrimaryDisplayValue();
    const typeLabel = getTypeLabel();

    // Metadata to exclude
    const metaKeys = ["state", "isDropTarget", "onEditNode", "nodeStyle"];
    const skippedKeys = new Set([...metaKeys]);

    // Skip primary display fields - but be careful about falsy values
    dataKeys.forEach((key) => {
      const formattedValue = formatValueForDisplay(data[key]);
      if (formattedValue === primaryValue && data[key] !== null && data[key] !== undefined) {
        skippedKeys.add(key);
      }

      // Skip type label fields
      if (key === "parentLeadType" || (key === "parentLead" && data.parentLead === typeLabel)) {
        skippedKeys.add(key);
      }
    });

    // Add all remaining data
    dataKeys.forEach((key) => {
      if (skippedKeys.has(key)) return;

      // Don't skip falsy values, show them with "-"
      // Format time fields
      if (key === "time" && typeof data[key] === "string") {
        pairs.push({
          key: "Time",
          value: data[key] ? new Date(data[key]).toLocaleString() : "-",
        });
        return;
      }

      // Format key name for display
      const formattedKey =
        key.charAt(0).toUpperCase() +
        key
          .slice(1)
          .replace(/([A-Z])/g, " $1")
          .trim();

      pairs.push({
        key: formattedKey,
        value: formatValueForDisplay(data[key]),
      });
    });

    return pairs;
  };

  // Check if there's additional data to show
  const hasAdditionalData = () => {
    return getKeyValuePairs().length > 0;
  };

  // Get display values
  const primaryValue = getPrimaryDisplayValue();
  const typeLabel = getTypeLabel();
  const keyValuePairs = getKeyValuePairs();
  const hasMore = hasAdditionalData();

  return (
    <TooltipProvider>
      <div
        className={cn(
          `${getNodeBackgroundClass()} shadow-md rounded-full px-4 py-2 w-[300px] transition-all duration-150 flex items-center`,
          dragging ? "opacity-70 cursor-grabbing" : "",
          isDropTarget ? "outline-2 outline-dashed outline-blue-500" : "",
        )}
        onClick={handleNodeClick}
      >
        {/* Left icon */}
        <div className="flex-shrink-0 p-1 rounded-full mr-3">{getNodeIcon()}</div>

        {/* Content - Two lines with tooltips */}
        <div className="flex-grow flex flex-col justify-center overflow-hidden">
          {/* Primary value with tooltip */}
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div className="font-mono text-sm font-medium truncate">{primaryValue}</div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div className="font-mono">{primaryValue}</div>
            </TooltipContent>
          </Tooltip>

          {/* Type label with tooltip */}
          {typeLabel && (
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="font-mono text-xs text-gray-500 uppercase truncate">{typeLabel}</div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="font-mono uppercase">{typeLabel}</div>
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
                className="p-1 h-6 w-6 mr-1"
                onClick={toggleInfoPopover}
                aria-label="View all data"
              >
                <InfoIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2" side="right" align="start">
              <div className="text-sm font-medium mb-2">{primaryValue} - Additional Data</div>
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full table-auto text-xs">
                  <tbody>
                    {keyValuePairs.map((pair, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-secondary/20" : "bg-background"}>
                        <td className="py-1 px-2 font-medium text-foreground">{pair.key}:</td>
                        <td className="py-1 px-2 font-mono break-all">
                          {pair.value === "-" ? <span className="text-gray-400">-</span> : pair.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Action menu trigger */}
        <Popover open={Boolean(isActionMenuOpen)} onOpenChange={setIsActionMenuOpen}>
          <PopoverTrigger asChild>
            <div
              className="p-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsActionMenuOpen((prev) => !prev);
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
              {hasMore && (
                <Button variant="ghost" size="sm" className="flex justify-start text-sm" onClick={toggleInfoPopover}>
                  <InfoIcon className="mr-2 h-4 w-4" /> View Additional Data
                </Button>
              )}
              <Button variant="ghost" size="sm" className="flex justify-start text-sm" onClick={handleEditNode}>
                <Edit className="mr-2 h-4 w-4" /> Edit Node
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onNodesDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Node
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Flow handles */}
        <Handle position={targetPosition || Position.Left} type="target" className="!left-0" />
        <Handle position={sourcePosition || Position.Right} type="source" className="!right-0" />

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

        {/* Small indicator that shows there is more data without tooltip */}
        {hasMore && !isInfoPopoverOpen && (
          <div className="absolute -bottom-2 right-1/3 -translate-x-1/2">
            <div className="text-[8px] text-gray-500 whitespace-nowrap bg-white/70 rounded-full px-1">
              +{keyValuePairs.length} more
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
