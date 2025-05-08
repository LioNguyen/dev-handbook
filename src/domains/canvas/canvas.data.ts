// src/components/canvas/initialElements.ts
import { Node, Edge } from "reactflow";

// Define root node position
const nodeX = 0;
const nodeY = 0;

// Define initial node data
export const nodes: Node[] = [
  {
    id: "1",
    type: "root",
    position: { x: nodeX, y: nodeY },
    data: {
      expanded: true,
      expandable: true,
      order: "1",
      value: "176.96.226.227",
      subtext: "IP ADDRESS",
      type: "starred",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: nodeX + 200, y: nodeY },
    data: {
      expanded: true,
      expandable: true,
      order: "2",
      value: "3.90.43.148",
      subtext: "IP ADDRESS",
      type: "ip",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: nodeX + 400, y: nodeY - 100 },
    data: {
      expanded: true,
      expandable: false,
      order: "2.1",
      value: "70.77.108.38",
      subtext: "IP ADDRESS",
      type: "ip",
    },
  },
  {
    id: "4",
    type: "custom",
    position: { x: nodeX + 400, y: nodeY + 100 },
    data: {
      expanded: true,
      expandable: false,
      order: "2.2",
      value: "d851d9ea-ce49-4bdb-a569",
      subtext: "MICROSOFT ENTRA DEVICE ID",
      type: "microsoft",
    },
  },
  {
    id: "5",
    type: "custom",
    position: { x: nodeX + 400, y: nodeY + 200 },
    data: {
      expanded: true,
      expandable: false,
      order: "2.3",
      value: "johanna1@warnicorn.com",
      subtext: "MICROSOFT ENTRA USER PRINCIPAL",
      type: "microsoft",
    },
  },
  {
    id: "6",
    type: "custom",
    position: { x: nodeX + 400, y: nodeY + 300 },
    data: {
      expanded: true,
      expandable: false,
      order: "2.4",
      value: "stevens@warnicorn.com",
      subtext: "MICROSOFT ENTRA USER PRINCIPAL",
      type: "microsoft",
    },
  },
];

// Define the connection edges between nodes
export const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e2-6", source: "2", target: "6" },
];
