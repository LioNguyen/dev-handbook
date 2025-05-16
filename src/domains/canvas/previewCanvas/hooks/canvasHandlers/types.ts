// src/domains/canvas/previewCanvas/hooks/canvasHandlers/types.ts
import { Edge, Node } from "@xyflow/react";

// Type cho cấu trúc phân cấp node
export type NodeHierarchy = {
  parentToChildren: Map<string, string[]>;
  childToParent: Map<string, string>;
};

// Type cho kết quả của getNodeTree
export type NodeTree = {
  treeNodeIds: Set<string>;
  treeEdgeIds: Set<string>;
  hierarchy: NodeHierarchy;
  getChildren: (id: string) => string[];
  getParent: (id: string) => string | undefined;
  getAncestors: (id: string) => string[];
  getDescendants: (id: string) => string[];
  getDepth: (id: string) => number;
  getNodesAtLevel: (level: number) => string[];
  isLeaf: (id: string) => boolean;
};

// Type cho kết quả của getSelectionInfo
export type SelectionInfo = {
  selectedNodes: Node[];
  selectedNodeIds: Set<string>;
  selectedEdges: Edge[];
  selectedEdgeIds: Set<string>;
};
