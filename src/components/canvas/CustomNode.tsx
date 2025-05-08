// src/components/canvas/CustomNode.tsx
import { ChevronDown, ChevronUp, CircleAlert, Info, Star, Trash2 } from "lucide-react";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";

import { Button } from "@designSystem/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@designSystem/components/ui/popover";
import "./styles.css";

/**
 * Custom node component with enhanced functionality
 */
export default function CustomNode({ data, id, xPos, yPos, sourcePosition, targetPosition, selected }: NodeProps) {
  const { addNodes, addEdges, deleteElements, getNodes } = useReactFlow();
  const [isOpen, setIsOpen] = useState(false);

  // Destructure data props
  const {
    toggleNodeExpansion,
    order = "",
    highlightNodes,
    highlightedNodeId,
    type = "ip", // Default type
    subtext = "IP ADDRESS",
    value = order,
  } = data;

  // Determine if this node is highlighted
  const isHighlighted = highlightedNodeId === id;

  // Close popover when node is selected
  useEffect(() => {
    if (selected) {
      setIsOpen(false);
    }
  }, [selected]);

  /**
   * Adds a new child node
   */
  const addChildNode: MouseEventHandler = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    // Generate a unique ID for the new node using timestamp
    const newNodeId = `${id}__${new Date().getTime()}`;

    // Determine position offset based on source position
    let posOffset = { x: 0, y: 100 }; // Default for bottom
    if (sourcePosition === Position.Right) {
      posOffset = { x: 100, y: 0 };
    } else if (sourcePosition === Position.Left) {
      posOffset = { x: -100, y: 0 };
    } else if (sourcePosition === Position.Top) {
      posOffset = { x: 0, y: -100 };
    }

    // Get the count of existing children to determine the new order
    const existingNodes = getNodes();
    const childrenCount = existingNodes.filter((n) => n.id.startsWith(`${id}__`)).length;
    const newOrder = `${order}.${childrenCount + 1}`;

    // Create a new node and connect it to the parent
    addNodes({
      id: newNodeId,
      type: "custom",
      position: {
        x: Number(xPos) + posOffset.x,
        y: Number(yPos) + posOffset.y,
      },
      data: {
        order: newOrder,
        value: `127.0.0.${Math.floor(Math.random() * 255)}`,
        expandable: false,
        expanded: false,
        toggleNodeExpansion,
        highlightNodes,
        type: "ip",
        subtext: "IP ADDRESS",
      },
      sourcePosition,
      targetPosition,
    });

    addEdges({
      id: `${id}->${newNodeId}`,
      source: id,
      target: newNodeId,
    });

    // If not expanded, expand it
    if (!data.expanded) {
      handleToggleExpand(evt);
    }
  };

  /**
   * Toggles node expansion state using the shared handler
   */
  const handleToggleExpand = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsOpen(false);

    if (data.expandable) {
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
  const deleteNode = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsOpen(false);
    deleteElements({ nodes: [{ id }] });
  };

  /**
   * Highlights this node and all its children
   */
  const handleNodeClick = () => {
    // Don't re-highlight if already highlighted
    if (isHighlighted) return;

    // Call the parent-provided highlightNodes function
    if (highlightNodes) {
      highlightNodes(id);
    }
  };

  // Get the icon based on the node type
  const getNodeIcon = () => {
    // Use different icons based on the type property
    if (type === "starred" || order === "1") {
      return <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
    } else if (type === "microsoft" || order.includes(".")) {
      return <CircleAlert className="h-4 w-4 text-violet-500" />;
    } else {
      return <CircleAlert className="h-4 w-4 text-blue-500" />;
    }
  };

  // Determine any special styling for the node
  const getNodeStyle = () => {
    // The node with order "2.2" is highlighted in the image
    if (isHighlighted) {
      return "bg-blue-100 outline-2 outline-pink-500";
    } else {
      return "bg-blue-100";
    }
  };

  return (
    <div
      className={`w-[300px] shadow-md rounded-full px-4 py-2 relative transition-all duration-150 flex items-center ${getNodeStyle()}`}
      onClick={(e) => {
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
        <div className="font-mono text-sm font-medium">{value}</div>
        <div className="font-mono text-xs text-gray-500 uppercase">{subtext}</div>
      </div>

      <Handle position={targetPosition || Position.Left} type="target" className="!left-0" />
      <Handle position={sourcePosition || Position.Right} type="source" className="!right-0" />

      {/* Warning icon for specific node */}
      {/* {order === "2.2" && (
        <div className="absolute -bottom-1 left-4">
          <div className="w-5 h-5 rounded-full bg-white p-0.5 border border-pink-500">
            <div className="w-full h-full bg-pink-500 text-white rounded-full flex items-center justify-center text-xs">
              !
            </div>
          </div>
        </div>
      )} */}

      {/* Action button with popover - styled for the new design */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
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
            {data.expandable && (
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start text-sm"
                onClick={handleToggleExpand}
                disabled={!data.expandable}
              >
                {data.expanded ? (
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
              onClick={deleteNode}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Node
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div
        className="font-mono text-[9px] absolute -bottom-5 left-1/2 -translate-x-1/2 w-[100px] text-center text-white hover:text-slate-100 cursor-pointer"
        onClick={addChildNode}
      >
        + add child node
      </div>
    </div>
  );
}
