import { XYPosition } from "@xyflow/react";
import { useEffect, useState } from "react";

import { useNodeCreate } from "@/domains/canvas/previewCanvas/hooks/nodeHandlers/useNodeCreate";
import { useNodeUpdate } from "@/domains/canvas/previewCanvas/hooks/nodeHandlers/useNodeUpdate";
import { usePreviewCanvas } from "@/domains/canvas/previewCanvas/PreviewCanvas.context";
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
import { Plus, Trash2 } from "lucide-react";
import { omit } from "lodash";

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
  const { nodes } = usePreviewCanvas();
  const createNode = useNodeCreate();
  const { updateNode } = useNodeUpdate();

  // Form state
  const [nodeData, setNodeData] = useState<Record<string, any>>({});
  const [nodeStyle, setNodeStyle] = useState("ip");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

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
      if (node && node.data) {
        // Clone the data to avoid reference issues
        const dataClone = omit(node.data, ["state"]);

        // Extract nodeStyle if it exists
        if (dataClone.nodeStyle) {
          setNodeStyle(dataClone.nodeStyle as any);
        } else if (dataClone.type) {
          setNodeStyle(dataClone.type as any);
        } else {
          setNodeStyle("ip");
        }

        setNodeData(dataClone);
      }
    } else if (open && !isEditMode) {
      // Reset form for new nodes
      setNodeData({});
      setNodeStyle("ip");
      setNewLabel("");
      setNewValue("");
    }
  }, [nodeId, nodes, open, isEditMode]);

  const handleFieldChange = (key: string, value: any) => {
    setNodeData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddCustomField = () => {
    if (newLabel.trim() === "") return;

    setNodeData((prev) => ({
      ...prev,
      [newLabel.trim()]: newValue,
    }));

    // Reset the inputs
    setNewLabel("");
    setNewValue("");
  };

  const handleRemoveField = (key: string) => {
    setNodeData((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    try {
      // Add nodeStyle to the data
      const finalData = {
        ...nodeData,
        nodeStyle,
      };

      if (isEditMode && nodeId) {
        // Update existing node
        updateNode({
          nodeId: nodeId,
          data: finalData,
          triggerLayoutAfterUpdate: true,
        });
      } else {
        // Create new node
        if (parentId) {
          // Create child node
          createNode({
            data: finalData,
            parent: {
              id: parentId,
            },
            nodeType: "custom",
          });
        } else if (position) {
          // Create standalone node
          createNode({
            position,
            data: finalData,
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

  // Check if at least one field has a non-empty value or if we have a valid style
  const isValid =
    Object.values(nodeData).some((value) =>
      typeof value === "string" ? value.trim() !== "" : value !== null && value !== undefined,
    ) || nodeStyle !== "";

  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Renders input field based on key and value type
  const renderField = (key: string, value: any) => {
    // Skip rendering nodeStyle as it has its own selector
    if (key === "nodeStyle") return null;

    // Handle different value types
    if (value === null || value === undefined) {
      return (
        <div key={key} className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={key} className="text-right font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          <div className="col-span-3 flex gap-2">
            <Input
              id={key}
              value=""
              onChange={(e) => handleFieldChange(key, e.target.value)}
              className="flex-1"
              placeholder={`Enter ${key}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveField(key)}
              className="h-10 w-10 shrink-0"
              title="Remove field"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    } else if (typeof value === "object") {
      // Render objects as formatted JSON in a readonly textbox
      return (
        <div key={key} className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor={key} className="text-right font-medium capitalize pt-2">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          <div className="col-span-3 flex gap-2">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md overflow-auto max-h-40 flex-1">
              <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveField(key)}
              className="h-10 w-10 shrink-0 self-start"
              title="Remove field"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    } else if (typeof value === "boolean") {
      // Render boolean as select
      return (
        <div key={key} className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={key} className="text-right font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          <div className="col-span-3 flex gap-2">
            <Select value={value ? "true" : "false"} onValueChange={(v) => handleFieldChange(key, v === "true")}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${key}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveField(key)}
              className="h-10 w-10 shrink-0"
              title="Remove field"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    } else {
      // Default: render as text input
      return (
        <div key={key} className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor={key} className="text-right font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </Label>
          <div className="col-span-3 flex gap-2">
            <Input
              id={key}
              value={String(value)}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              className="flex-1"
              placeholder={`Enter ${key}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveField(key)}
              className="h-10 w-10 shrink-0"
              title="Remove field"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md p-6 overflow-y-auto max-h-screen" onClick={preventPropagation}>
        <SheetHeader className="mb-6 p-0">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div
          className="grid gap-6 py-4"
          onDoubleClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {/* Node Style Selector (always shown) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nodeStyle" className="text-right font-medium">
              Style
            </Label>
            <div className="col-span-3">
              <Select value={nodeStyle} onValueChange={setNodeStyle}>
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

          {/* Dynamic fields based on node data */}
          {Object.entries(nodeData)
            .filter(([key]) => key !== "nodeStyle")
            .map(([key, value]) => renderField(key, value))}

          {/* Add custom field section */}
          <div className="grid grid-cols-4 items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Label className="text-right font-medium">Add Field</Label>
            <div className="col-span-3 flex flex-col gap-3">
              <div className="flex gap-2">
                <Input
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Field name"
                  className="flex-1"
                />
                <Input
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Value"
                  className="flex-1"
                />
                <Button
                  onClick={handleAddCustomField}
                  disabled={!newLabel.trim()}
                  size="icon"
                  variant="outline"
                  className="h-10 w-10 shrink-0"
                  title="Add custom field"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8 pt-4 border-t">
          <SheetClose asChild>
            <Button variant="outline" className="min-w-[80px]">
              Cancel
            </Button>
          </SheetClose>
          <Button variant="outline" onClick={handleSubmit} disabled={isSubmitting || !isValid} className="min-w-[80px]">
            {isSubmitting ? "Saving..." : isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NodeDetailSheet;
