import { Node, Edge } from "@xyflow/react";

// Define root node position
const nodeX = 0;
const nodeY = 0;

// Define initial node data
export const nodes: Node[] = [
  {
    id: "1",
    type: "root",
    draggable: false,
    position: { x: nodeX, y: nodeY },
    data: {
      expanded: true,
      expandable: true,
      value: "176.96.226.227",
      name: "IP ADDRESS",
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
      value: "3.90.43.148",
      name: "IP ADDRESS",
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
      value: "70.77.108.38",
      name: "IP ADDRESS",
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
      value: "d851d9ea-ce49-4bdb-a569",
      name: "MICROSOFT ENTRA DEVICE ID",
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
      value: "johanna1@warnicorn.com",
      name: "MICROSOFT ENTRA USER PRINCIPAL",
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
      value: "stevens@warnicorn.com",
      name: "MICROSOFT ENTRA USER PRINCIPAL",
      type: "microsoft",
    },
  },
];

// Define the connection edges between nodes
export const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "1", target: "3" },
  { id: "e2-4", source: "1", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e2-6", source: "2", target: "6" },
];
