// src/components/canvas/configCanvas/NodeDetailSheet.tsx
import { XYPosition } from "@xyflow/react";
import { Info } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useConfigCanvas } from "@/domains/canvas/configCanvas/ConfigCanvas.context";
import { useNodeCreate } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useNodeCreate";
import { useNodeUpdate } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useNodeUpdate";
import { Badge } from "@designSystem/components/ui/badge";
import { Button } from "@designSystem/components/ui/button";
import { Label } from "@designSystem/components/ui/label";
import { ScrollArea } from "@designSystem/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@designSystem/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@designSystem/components/ui/tooltip";

// Import the sample data schema
import { useGetNodeTree } from "@/domains/canvas/configCanvas/hooks/canvasHandlers";
import { useNodesDelete } from "@/domains/canvas/configCanvas/hooks/nodeHandlers/useNodesDelete";
import useConfigCanvasAutoLayout from "@/domains/canvas/configCanvas/hooks/useConfigCanvasAutoLayout";
import canvasData from "@/domains/canvas/data/canvas.json";
import { getKeysAtEachLevel } from "@/domains/canvas/utils/dataUtils";

interface NodeDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: XYPosition;
  addNodeId?: string;
  nodeId?: string;
  parentId?: string;
}

export function NodeDetailSheet({ open, onOpenChange, position, addNodeId, nodeId, parentId }: NodeDetailSheetProps) {
  const { nodes } = useConfigCanvas();
  const { createNode } = useNodeCreate();
  const { updateNode } = useNodeUpdate();
  const deleteNodes = useNodesDelete();
  const getNodeTree = useGetNodeTree();
  const { triggerLayout } = useConfigCanvasAutoLayout();

  // Find the parent node and get its level
  const nodeTree = getNodeTree("1");
  const nodeLevel = nodeId ? nodeTree.getDepth(nodeId) - 1 : parentId ? nodeTree.getDepth(parentId) : 0;

  // Form state
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!nodeId;
  const title = isEditMode ? "Edit Node" : parentId ? "Add Child Node" : "Create Node";
  const description = isEditMode ? "Modify selected fields" : "Select fields from the schema to create a node";

  // Extract schema fields based on the current node level using getKeysAtEachLevel
  const schemaFields = useMemo(() => {
    try {
      // Use getKeysAtEachLevel to get fields at the current nodeLevel
      const levelKeys = getKeysAtEachLevel(canvasData);

      // Get fields at the current level, or empty array if level doesn't exist
      const fieldsAtLevel = levelKeys[nodeLevel] || [];

      // Sort fields alphabetically for better UI
      return [...fieldsAtLevel].sort();
    } catch (error) {
      console.error("Error extracting schema fields:", error);
      return [];
    }
  }, [nodeLevel]);

  // Load existing node data if in edit mode
  useEffect(() => {
    if (nodeId && open) {
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        // Check for value as array first
        if (Array.isArray(node.data?.value)) {
          setSelectedFields(node.data.value);
        }
        // If fields exists, use that
        else if (Array.isArray(node.data?.fields)) {
          setSelectedFields(node.data.fields);
        }
        // Otherwise try to parse fields from the value string
        else if (typeof node.data?.value === "string") {
          const valueFields = node.data.value.split(",").map((f) => f.trim());
          setSelectedFields(valueFields.filter((f) => f.length > 0));
        } else {
          setSelectedFields([]);
        }
      }
    } else if (open && !isEditMode) {
      // Reset form for new nodes
      setSelectedFields([]);
    }
  }, [nodeId, nodes, open, isEditMode]);

  const handleSubmit = () => {
    setIsSubmitting(true);

    try {
      if (isEditMode && nodeId) {
        // Update existing node with only value as an array of selected fields
        updateNode({
          nodeId: nodeId,
          data: {
            value: selectedFields,
          },
          triggerLayoutAfterUpdate: true,
        });
      } else {
        // Create a node with only value as an array of selected fields
        if (selectedFields.length > 0) {
          createNode({
            position: position,
            data: {
              value: selectedFields,
            },
            parent: parentId ? { id: parentId } : undefined,
            nodeType: "custom",
          });

          // Delete the add node if it exists
          if (addNodeId) {
            setTimeout(() => {
              deleteNodes([addNodeId]);
            }, 500);
          }

          triggerLayout();
        }
      }

      // Close the sheet after submission
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating/updating node:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle a field selection
  const toggleFieldSelection = (field: string) => {
    setSelectedFields((prev) => (prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]));
  };

  // Select all fields
  const selectAllFields = () => {
    setSelectedFields(schemaFields);
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedFields([]);
  };

  // Validation for form submission
  const isValid = selectedFields.length > 0;

  // Prevent event propagation to parent elements
  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md px-6" onClick={preventPropagation}>
        <SheetHeader className="pb-4">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {/* Field Selection UI (same for both create and edit mode) */}
        <div
          className="flex flex-col space-y-4"
          onDoubleClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              Available Fields
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="w-[200px] text-xs">
                      These fields are extracted from the data schema. Select fields to include in your node.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Badge className="h-6 px-2 rounded-full" variant="outline">
              {selectedFields.length} selected
            </Badge>
          </div>

          {/* Move Select All and Clear buttons above the field list */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={selectAllFields}
                disabled={schemaFields.length === 0}
              >
                Select All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={clearSelections}
                disabled={selectedFields.length === 0}
              >
                Clear
              </Button>
            </div>
          </div>

          {schemaFields.length === 0 ? (
            <div className="py-4 text-center text-muted-foreground border rounded-md">
              No fields available at this level
            </div>
          ) : (
            <ScrollArea className="h-[340px] rounded-md border">
              <div className="flex flex-col gap-3 p-2">
                {schemaFields.map((field) => {
                  const isSelected = selectedFields.includes(field);
                  return (
                    <Button
                      key={field}
                      className={`flex items-center px-3 py-2 text-left rounded-md w-full transition-all hover:border-2 hover:border-dashed! hover:border-gray-800! focus:outline-none! ${
                        isSelected
                          ? "  border-2 border-dashed! border-gray-800! shadow-md text-slate-800!"
                          : "hover:bg-gray-100!  text-slate-500! border border-transparent"
                      }`}
                      onClick={() => toggleFieldSelection(field)}
                    >
                      <span className="truncate">{field}</span>
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <SheetClose asChild>
            <Button variant="ghost">Cancel</Button>
          </SheetClose>
          <Button
            variant="outline"
            onClick={handleSubmit}
            disabled={isSubmitting || !isValid}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Processing..." : isEditMode ? "Update Node" : "Create Node"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NodeDetailSheet;
