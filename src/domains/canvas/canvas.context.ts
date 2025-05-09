// src/domains/canvas/canvas.context.ts
import { createContext } from "@core/store";
import { Node, Edge, ReactFlowInstance } from "@xyflow/react";

// Define the exact shape of your context
interface CanvasContextValue {
  // States from service
  getInitialNodes: () => Node[];
  getInitialEdges: () => Edge[];

  // States
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  highlightedNodeId: string | null;
  setHighlightedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  highlightedEdges: Set<string>;
  setHighlightedEdges: React.Dispatch<React.SetStateAction<Set<string>>>;
  highlightedNodes: Set<string>;
  setHighlightedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: React.Dispatch<React.SetStateAction<ReactFlowInstance | null>>;
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
  autoLayoutCanvas: () => void;
  toggleNodeExpansion: (nodeId: string) => void;

  // Derived states
  visibleNodes: Node[];
  visibleEdges: Edge[];
  animatedNodes: Node[];
}

export const { Provider, useValue: useCanvas } = createContext<CanvasContextValue>("Canvas");
