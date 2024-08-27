import { Node, Edge } from 'reactflow';

const nodes: Node[] = [
  {
    id: 'group-1',
    type: 'group',
    position: {
      x: 0,
      y: 0,
    },
    data: {},
  },
  {
    id: '1',
    parentNode: 'group-1',
    type: 'node',
    position: {
      x: 25,
      y: 80,
    },
    data: { label: 'Node 1' },
    extent: 'parent',
  },
  {
    id: '2',
    parentNode: 'group-1',
    type: 'node',
    position: {
      x: 250,
      y: 25,
    },
    data: { label: 'Node 2' },
    extent: 'parent',
  },
  {
    id: '3',
    parentNode: 'group-1',
    type: 'node',
    position: {
      x: 250,
      y: 140,
    },
    data: { label: 'Node 3' },
    extent: 'parent',
  },
  {
    id: '4',
    type: 'node',
    position: {
      x: 500,
      y: 100,
    },
    data: { label: 'Node 4' },
  },
  {
    id: '5',
    type: 'node',
    position: {
      x: 650,
      y: 50,
    },
    data: { label: 'Node 5' },
  },
  {
    id: '6',
    type: 'node',
    position: {
      x: 800,
      y: 150,
    },
    data: { label: 'Node 6' },
  },
];

const edges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
];

export { nodes, edges };
