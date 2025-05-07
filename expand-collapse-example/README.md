# React Flow - Expandable Tree with Animations

This sample codebase demonstrates creating an interactive, animated tree diagram with expandable/collapsible nodes using React Flow and D3. Below you'll find the key concepts and techniques demonstrated in this project.

## 1. Overview

This project showcases how to build a hierarchical tree visualization with the following features:

- Expandable/collapsible tree nodes
- Smooth animations for node movements
- Custom node components
- Dynamic node addition
- Tree layout calculation using D3
- Synchronized state management

![React Flow Tree Diagram](https://reactflow.dev/img/examples/expand-collapse.jpg)

## 2. Component Architecture

### 2.1 Main Components

- **ReactFlowWrapper**: Provides context for React Flow
- **ReactFlowPro**: Main component managing state and interactions
- **CustomNode**: Interactive node component with expand/collapse functionality

### 2.2 Custom Hooks

- **useExpandCollapse**: Calculates tree layout and handles node visibility
- **useAnimatedNodes**: Manages smooth transitions between node positions

## 3. Key Features & Implementation

### 3.1 Expandable/Collapsible Tree Nodes

The expand/collapse functionality uses state management to track which nodes are expanded:

```tsx
const onNodeClick: NodeMouseHandler = useCallback(
  (_, node) => {
    console.log(
      `Node clicked: ${node.id}, current expand state:`,
      node.data.expanded
    );

    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          // Toggle the expanded state of the clicked node
          const newExpandState = !n.data.expanded;

          return {
            ...n,
            data: { ...n.data, expanded: newExpandState },
          };
        }

        return n;
      })
    );
  },
  [setNodes]
);
```

### 3.2 Tree Layout Calculation with D3

The `useExpandCollapse` hook uses D3's hierarchy and tree algorithms to organize nodes:

```tsx
// Create a hierarchical structure from flat nodes and edges
const hierarchy = stratify<ExpandCollapseNode>()
  .id((d) => d.id)
  .parentId((d: Node) => {
    const parentEdge = edges.find((e: Edge) => e.target === d.id);
    return parentEdge?.source;
  })(nodes);

// Process nodes to determine which are expandable
hierarchy.descendants().forEach((d) => {
  // Mark nodes as expandable if they have children
  d.data.data.expandable = !!d.children?.length;

  // If node is not expanded, hide its children
  d.children = d.data.data.expanded ? d.children : undefined;
});

// Create and apply a tree layout using D3
const layout = tree<ExpandCollapseNode>()
  .nodeSize([treeWidth, treeHeight])
  .separation(() => 1);

const root = layoutNodes ? layout(hierarchy) : hierarchy;
```

### 3.3 Smooth Animations

Node position transitions are smoothly animated using D3's timer and linear interpolation:

```tsx
// Create transition data for each node
const transitions = nodes.map((node) => ({
  id: node.id,
  from: getNode(node.id)?.position ?? node.position,
  to: node.position,
  node,
}));

// Animate positions with D3 timer
const t = timer((elapsed) => {
  // Calculate progress (0 to 1)
  const s = elapsed / animationDuration;

  // Calculate interpolated positions for all nodes
  const currNodes = transitions.map(({ node, from, to }) => {
    return {
      ...node,
      position: {
        x: from.x + (to.x - from.x) * s,
        y: from.y + (to.y - from.y) * s,
      },
    };
  });

  // Update nodes with interpolated positions
  setTmpNodes(currNodes);

  // Stop animation when complete
  if (elapsed > animationDuration) {
    setTmpNodes(nodes);
    t.stop();
  }
});
```

### 3.4 Custom Node Implementation

Create custom nodes with interactive elements and handles for connections:

```tsx
export default function CustomNode({ data, id, xPos, yPos }: NodeProps) {
  const { addNodes, addEdges } = useReactFlow();

  // Add a new child node when button is clicked
  const addChildNode: MouseEventHandler = (evt) => {
    if (data.expanded) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const newNodeId = `${id}__${new Date().getTime()}`;

    // Create a new node and connect it to the parent
    addNodes({
      id: newNodeId,
      position: { x: xPos, y: yPos + 100 },
      data: { label: "X" },
    });

    addEdges({
      id: `${id}->${newNodeId}`,
      source: id,
      target: newNodeId,
    });
  };

  // Determine label based on expandable state
  const label = data.expandable
    ? data.expanded
      ? "Click to collapse ▲"
      : "Click to expand ▼"
    : "nothing to expand";

  return (
    <div className={styles.node}>
      <div className={styles.label}>{label}</div>
      <Handle position={Position.Top} type="target" />
      <Handle position={Position.Bottom} type="source" />
      <div className={styles.button} onClick={addChildNode}>
        + add child node
      </div>
    </div>
  );
}
```

## 4. Implementation Details

### 4.1 React Flow Configuration

Configure React Flow with appropriate options for tree visualization:

```tsx
<ReactFlow
  fitView
  nodes={animatedNodes}
  edges={visibleEdges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onNodeClick={onNodeClick}
  nodeTypes={nodeTypes}
  nodesDraggable={false} // Prevent node dragging to maintain tree layout
  nodesConnectable={false} // Prevent manual connections
  zoomOnDoubleClick={false}
  elementsSelectable={false}
>
  <Background />
  <MiniMap />
</ReactFlow>
```

### 4.2 Node Visibility Management

The expand/collapse hook filters visible nodes and edges based on expanded state:

```tsx
// Extract visible nodes from the hierarchy
const visibleNodes = root.descendants().map((d) => ({
  ...d.data,
  // Create a new reference for the data object to trigger React renders
  data: { ...d.data.data },
  type: "custom",
  position: isHierarchyPointNode(d) ? { x: d.x, y: d.y } : d.data.position,
}));

// Only keep edges between visible nodes
const visibleEdges = edges.filter(
  (edge) =>
    root.find((h) => h.id === edge.source) &&
    root.find((h) => h.id === edge.target)
);
```

### 4.3 Type Safety with TypeScript

The project uses TypeScript for type safety, with custom types for components and hooks:

```tsx
// Props for the main component
type ExpandCollapseExampleProps = {
  treeWidth?: number; // Width between nodes in the tree
  treeHeight?: number; // Height between node layers
  animationDuration?: number; // Duration of animations in ms
};

// Options for the expand/collapse hook
export type UseExpandCollapseOptions = {
  layoutNodes?: boolean; // Whether to apply the tree layout
  treeWidth?: number; // Width between sibling nodes
  treeHeight?: number; // Height between parent and child nodes
};
```

## 5. Best Practices Demonstrated

### 5.1 Custom Hooks for Logic Separation

The code demonstrates how to organize complex logic into custom hooks:

```tsx
// In the main component:
const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(
  nodes,
  edges,
  { treeWidth, treeHeight }
);

const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, {
  animationDuration,
});
```

### 5.2 Memoization for Performance

Use `useMemo` to prevent unnecessary recalculations of the tree layout:

```tsx
return useMemo(() => {
  // Expensive layout calculations here...

  return {
    nodes: visibleNodes,
    edges: visibleEdges,
  };
}, [nodes, edges, layoutNodes, treeWidth, treeHeight]);
```

### 5.3 Callback Optimization

Use the `useCallback` hook to prevent unnecessary re-renders when passing handlers:

```tsx
const onNodesChange: OnNodesChange = useCallback((changes) => {
  console.log("Node changes:", changes);
  setNodes((nds) => applyNodeChanges(changes, nds));
}, []);
```

## 6. Advanced D3 Integration

### 6.1 Using D3's Hierarchy and Tree Algorithms

D3 provides powerful algorithms for tree visualization that integrate with React:

```tsx
// Create hierarchy from flat data
const hierarchy = stratify<ExpandCollapseNode>()
  .id((d) => d.id)
  .parentId((d: Node) => {
    // Find parent by looking at incoming edges
    const parentEdge = edges.find((e: Edge) => e.target === d.id);
    return parentEdge?.source;
  })(nodes);

// Apply tree layout
const layout = tree<ExpandCollapseNode>()
  .nodeSize([treeWidth, treeHeight])
  .separation(() => 1);
```

### 6.2 Animation with D3 Timer

D3's timer is used for smooth animations instead of CSS transitions:

```tsx
import { timer } from "d3-timer";

// Create timer for animation
const t = timer((elapsed) => {
  const s = elapsed / animationDuration;

  // Calculate interpolated positions...

  // Stop animation when complete
  if (elapsed > animationDuration) {
    setTmpNodes(nodes);
    t.stop();
  }
});
```

## 7. Getting Started

To use this code in your own project:

1. Install the required dependencies:

```bash
npm install reactflow d3-hierarchy d3-timer
```

2. Copy the component files into your project
3. Customize the initial nodes and edges
4. Configure tree dimensions and animation duration as needed

## 8. Customization Options

The component accepts several properties to customize its behavior:

```tsx
<ReactFlowWrapper
  treeWidth={250} // Width between sibling nodes
  treeHeight={120} // Height between parent and child nodes
  animationDuration={500} // Animation duration in milliseconds
/>
```

This implementation provides a solid foundation for building interactive, animated tree diagrams that can be further customized for specific use cases such as organization charts, file system browsers, or decision trees.
