// src/components/canvas/configCanvas/NodeDetailSheet.tsx
import { XYPosition } from "@xyflow/react";
import { useEffect, useState } from "react";

import { useCanvas } from "@/domains/canvas";
import { useNodeCreate } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useNodeCreate";
import { useNodeUpdate } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useNodeUpdate";
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
  { value: "aws", label: "AWS" },
  { value: "gcp", label: "Google Cloud" },
  { value: "key", label: "Key Node" },
  { value: "success", label: "Success Status" },
  { value: "error", label: "Error Status" },
  { value: "warning", label: "Warning Status" },
  { value: "info", label: "Info Node" },
];

export function NodeDetailSheet({ open, onOpenChange, position, nodeId, parentId }: NodeDetailSheetProps) {
  const { nodes } = useCanvas();
  const createNode = useNodeCreate();
  const { updateNode } = useNodeUpdate();

  // Form state
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
        setNodeType((node.data?.nodeStyle || node.data?.type || "ip") as string);
      }
    } else if (open && !isEditMode) {
      // Reset form for new nodes
      setNodeName("");
      setNodeValue("");
      setNodeType("ip");
    }
  }, [nodeId, nodes, open, isEditMode]);

  const handleSubmit = () => {
    setIsSubmitting(true);

    try {
      if (isEditMode && nodeId) {
        // Use our custom updateNode hook instead of reactFlowInstance.updateNode
        updateNode({
          nodeId: nodeId,
          data: {
            name: nodeName,
            value: nodeValue,
            nodeStyle: nodeType,
          },
          // Optionally trigger a layout refresh after update
          triggerLayoutAfterUpdate: true,
        });
      } else {
        // Create new node using the useNodeCreate hook
        const nodeData = {
          name: nodeName,
          value: nodeValue,
          nodeStyle: nodeType,
        };

        if (parentId) {
          // Create child node
          createNode({
            data: nodeData,
            parent: {
              id: parentId,
            },
            nodeType: "custom",
          });
        } else if (position) {
          // Create standalone node
          createNode({
            position,
            data: nodeData,
            nodeType: "custom",
          });
        }
      }

      // Close the sheet after submission
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving node:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation for form submission
  const isValid = nodeName.trim() !== "" && nodeValue.trim() !== "";

  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md p-6" onClick={preventPropagation}>
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
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right font-medium">
              Style
            </Label>
            <div className="col-span-3">
              <Select value={nodeType} onValueChange={setNodeType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select node style" />
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
            <Button variant="outline" className="min-w-[80px]">
              Cancel
            </Button>
          </SheetClose>
          <Button variant="default" onClick={handleSubmit} disabled={isSubmitting || !isValid} className="min-w-[80px]">
            {isSubmitting ? "Saving..." : isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NodeDetailSheet;
