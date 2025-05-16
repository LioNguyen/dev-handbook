import { createContext } from "@core/store";
import { Edge, Node, OnEdgesChange, OnNodesChange, ReactFlowInstance } from "@xyflow/react";
import { Dispatch, SetStateAction } from "react";

// Define the exact shape of your context
interface CanvasContextValue {
  // States
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;

  // Change handlers
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;

  // React Flow instance
  reactFlowInstance: ReactFlowInstance<Node, Edge>;

  // Settings
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
