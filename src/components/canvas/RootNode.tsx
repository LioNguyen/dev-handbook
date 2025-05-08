// src/components/canvas/RootNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";

type RootNodeProps = {
  data: {
    value: string;
    subtext?: string;
    highlightedNodeId?: string | null;
    highlightNodes?: (nodeId: string) => void;
    toggleNodeExpansion?: (nodeId: string) => void;
  };
  id: string;
};

const RootNode: React.FC<RootNodeProps> = ({ data, id }) => {
  const isHighlighted = data.highlightedNodeId === id;

  // Handle mouse interactions
  const handleMouseEnter = () => {
    if (data.highlightNodes) {
      data.highlightNodes(id);
    }
  };

  const handleMouseLeave = () => {
    // Only clear if this node is highlighted
    if (data.highlightedNodeId === id && data.highlightNodes) {
      data.highlightNodes("");
    }
  };

  const handleClick = () => {
    if (data.toggleNodeExpansion) {
      data.toggleNodeExpansion(id);
    }
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      {/* Radiating lines effect */}
      <div className="absolute -z-10 w-48 h-48 -left-12 -top-12 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          <div className="radiate-lines"></div>
        </div>
      </div>

      {/* Hexagonal node */}
      <div className={`hexagon ${isHighlighted ? "highlighted" : ""}`}>
        <div className="hexagon-content">
          <div className="text-xs">{data.value}</div>
        </div>
      </div>

      {/* Connection handle (only on the right for LR layout) */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: "#555", width: "8px", height: "8px" }}
      />
    </div>
  );
};

export default RootNode;
