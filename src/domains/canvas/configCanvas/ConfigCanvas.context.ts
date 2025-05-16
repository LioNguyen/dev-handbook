// src/domains/canvas/canvas.context.ts
import { createContext } from "@core/store";
import { Edge, Node, OnEdgesChange, OnNodesChange, ReactFlowInstance } from "@xyflow/react";

// Define the exact shape of your context
interface CanvasContextValue {
  // States
  nodes: Node[];
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
  edges: Edge[];
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;

  // Change handlers
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;

  reactFlowInstance: ReactFlowInstance | null;
  canvasSettings: {
    treeWidth: number;
    treeHeight: number;
    animationDuration: number;
    direction: "TB" | "LR" | "RL" | "BT";
  };
  setCanvasSettings: React.Dispatch<
    React.SetStateAction<{
      treeWidth: number;
      treeHeight: number;
      animationDuration: number;
      direction: "TB" | "LR" | "RL" | "BT";
    }>
  >;

  // Functions
  triggerLayout: () => void;
}

export const { Provider, useValue: useConfigCanvas } = createContext<CanvasContextValue>("ConfigCanvas");
