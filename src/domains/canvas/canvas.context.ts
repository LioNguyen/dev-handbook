// src/domains/canvas/canvas.context.ts
import { createContext } from "@core/store";
import { Edge, Node, OnEdgesChange, OnNodesChange, ReactFlowInstance } from "@xyflow/react";

import { ExtendedReactFlowInstance } from "./utils/extendedFlowInstance";

// Define the exact shape of your context
interface CanvasContextValue {
  // States from service
  getInitialNodes: () => Node[];
  getInitialEdges: () => Edge[];

  // States
  nodes: Node[];
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
  edges: Edge[];
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;

  // Change handlers
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;

  reactFlowInstance: ExtendedReactFlowInstance | null;
  setReactFlowInstance: (instance: ReactFlowInstance) => void;
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

  // Derived states
  visibleNodes: Node[];
  visibleEdges: Edge[];
  animatedNodes: Node[];
}

export const { Provider, useValue: useCanvas } = createContext<CanvasContextValue>("Canvas");
