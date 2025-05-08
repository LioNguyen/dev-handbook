// src/domains/canvas/canvas.context.ts
import { createContext } from "@core/store";
import { Node, Edge, ReactFlowInstance } from "reactflow";

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
  highlightedEdges: Set<string>;
  highlightedNodes: Set<string>;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: React.Dispatch<React.SetStateAction<ReactFlowInstance | null>>;
  canvasSettings: {
    treeWidth: number;
    treeHeight: number;
    animationDuration: number;
    direction: "TB" | "LR" | "RL" | "BT";
  };

  // Derived states
  visibleNodes: Node[];
  visibleEdges: Edge[];
  animatedNodes: Node[];

  // Functions
  highlightNodes: (nodeId: string) => void;
  getNodeDescendants: (nodeId: string) => { descendants: Set<string>; edgesToHighlight: Set<string> };
  zoomIn: () => void;
  zoomOut: () => void;
  fitView: () => void;
  setCanvasSettings: React.Dispatch<
    React.SetStateAction<{
      treeWidth: number;
      treeHeight: number;
      animationDuration: number;
      direction: "TB" | "LR" | "RL" | "BT";
    }>
  >;
}

export const { Provider, useValue: useCanvas } = createContext<CanvasContextValue>("Canvas");
