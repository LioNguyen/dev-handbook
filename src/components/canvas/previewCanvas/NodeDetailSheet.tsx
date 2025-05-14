// src/components/sheet/NodeDetailSheet.tsx
import { XYPosition } from "@xyflow/react";
import { useEffect, useState } from "react";

import { useCanvas } from "@/domains/canvas";
import { Button } from "@designSystem/components/ui/button";
import { Input } from "@designSystem/components/ui/input";
import { Label } from "@designSystem/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@designSystem/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@designSystem/components/ui/sheet";

interface NodeDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: XYPosition;
  nodeId?: string;
  parentId?: string;
}

const NODE_TYPES = [
  { value: "ip", label: "IP Address" },
  { value: "starred", label: "Starred" },
  { value: "microsoft", label: "Microsoft" },
];

export function NodeDetailSheet({ open, onOpenChange, position, nodeId, parentId }: NodeDetailSheetProps) {
  const { nodes, reactFlowInstance } = useCanvas();
  // Using setState instead of direct variable assignment to avoid type errors
  const [nodeName, setNodeName] = useState("");
  const [nodeValue, setNodeValue] = useState("");
  const [nodeType, setNodeType] = useState("ip");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!nodeId;
  const title = isEditMode ? "Edit Node" : parentId ? "Add Child Node" : "Create Node";
  const description = isEditMode
    ? "Update the details of this node"
    : parentId
    ? "Add a new child node"
    : "Add a new node to the canvas";

  // Load existing node data if in edit mode
  useEffect(() => {
    if (nodeId && open) {
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        // Safe access with fallbacks to avoid type errors
        setNodeName(node.data?.name ? String(node.data.name) : "");
        setNodeValue(node.data?.value ? String(node.data.value) : "");
        setNodeType(node.data?.type ? String(node.data.type) : "ip");
      }
    } else if (open && !isEditMode) {
      // Reset form for new nodes
      setNodeName("");
      setNodeValue("");
      setNodeType("ip");
    }
  }, [nodeId, nodes, open, isEditMode]);

  const handleSubmit = () => {
    if (!reactFlowInstance) return;

    setIsSubmitting(true);

    try {
      if (isEditMode && nodeId) {
        // Update existing node using updateNode method
        reactFlowInstance.updateNode(nodeId, {
          data: {
            // Preserve existing data that we're not updating
            ...nodes.find((n) => n.id === nodeId)?.data,
            name: nodeName,
            value: nodeValue,
            type: nodeType,
            subtext: nodeType.toUpperCase(),
          },
        });
      } else {
        // Create new node
        const newNodeId = `${parentId ? `${parentId}__` : "standalone_"}${new Date().getTime()}`;

        // Calculate node position
        let nodePosition = position;
        if (parentId) {
          // Find parent node to get its position
          const parentNode = nodes.find((node) => node.id === parentId);
          if (parentNode) {
            // Position offset for child nodes
            nodePosition = {
              x: parentNode.position.x + 350, // Default offset for right direction
              y: parentNode.position.y,
            };
          }
        }

        if (!nodePosition) {
          console.error("Position is required for node creation");
          return;
        }

        // Create new node
        const newNode = {
          id: newNodeId,
          type: "custom",
          position: nodePosition,
          data: {
            name: nodeName,
            value: nodeValue,
            type: nodeType,
            subtext: nodeType.toUpperCase(),
          },
        };

        reactFlowInstance.addNodes(newNode);

        // If this is a child node, create an edge to the parent
        if (parentId) {
          reactFlowInstance.addEdges({
            id: `${parentId}->${newNodeId}`,
            source: parentId,
            target: newNodeId,
          });
        }

        // Auto-layout after adding a node
        setTimeout(() => {
          reactFlowInstance.fitView();
        }, 100);
      }

      // Close the sheet after submission
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving node:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md p-6">
        <SheetHeader className="mb-6 p-0">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-medium">
              Name
            </Label>
            <Input
              id="name"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              className="col-span-3"
              placeholder="Node Name"
              onClick={preventPropagation}
              onDoubleClick={preventPropagation}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-right font-medium">
              Value
            </Label>
            <Input
              id="value"
              value={nodeValue}
              onChange={(e) => setNodeValue(e.target.value)}
              className="col-span-3"
              placeholder="Node Value"
              onClick={preventPropagation}
              onDoubleClick={preventPropagation}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right font-medium">
              Type
            </Label>
            <div className="col-span-3" onClick={preventPropagation} onDoubleClick={preventPropagation}>
              <Select value={nodeType} onValueChange={setNodeType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select node type" />
                </SelectTrigger>
                <SelectContent>
                  {NODE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8 pt-4 border-t">
          <SheetClose asChild>
            <Button variant="outline" onClick={preventPropagation} className="min-w-[80px]">
              Cancel
            </Button>
          </SheetClose>
          <Button
            variant="outline"
            onClick={(e) => {
              preventPropagation(e);
              handleSubmit();
            }}
            disabled={isSubmitting || !nodeName || !nodeValue}
          >
            {isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NodeDetailSheet;
