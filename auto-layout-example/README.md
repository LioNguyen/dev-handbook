# React Flow - Auto Layout Example

This example shows how to create an interactive, automatically organized tree diagram using React Flow with D3 for layout calculations. Learn how to build interactive node-based diagrams with automatic hierarchical arrangement.

## 1. Overview

This demo showcases:

- Automatic tree layout using D3's hierarchical algorithms
- Drag and drop functionality for adding new nodes
- Custom node components with drop zones
- Directional layout options (top-to-bottom, left-to-right, etc.)
- Animated transitions when adding nodes

![React Flow Auto Layout Example](https://reactflow.dev/img/examples/auto-layout.jpg)

## 2. Key Components

### 2.1 Main Application (App.tsx)

The main component manages the flow diagram state and provides interaction handlers:

```tsx
function ReactFlowPro({ direction = "TB" }: ExampleProps) {
  const { fitView } = useReactFlow();
  useAutoLayout({ direction });
  const [nodes, setNodes] = useState<Node<NodeData>[]>(initialElements.nodes);
  const [edges, setEdges] = useState<Edge[]>(initialElements.edges);

  // Creates a new node connected to the specified source node
  const createConnection = (sourceId: string) => {
    const targetId: string = `${nodes.length + 1}`;

    const targetNode: Node<NodeData> = {
      id: targetId,
      data: { label: `Node ${targetId}` },
      position: { x: 0, y: 0 },
      type: "custom",
      style: { opacity: 0 },
    };

    const connectingEdge: Edge = {
      id: `${sourceId}->${targetId}`,
      source: sourceId,
      target: targetId,
      style: { opacity: 0 },
    };

    setNodes((nodes) => nodes.concat([targetNode]));
    setEdges((edges) => edges.concat([connectingEdge]));
  };

  // ...handlers for interactions (clicks, drops, etc.)

  return (
    <div className={styles.container}>
      <Sidebar />
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        // ... other props
      />
    </div>
  );
}
```

## 3. Auto Layout Implementation

### 3.1 The useAutoLayout Hook

This custom hook handles the automatic arrangement of nodes in a hierarchy:

```tsx
function useAutoLayout({ direction }: Options) {
  // Get access to ReactFlow state and methods
  const nodeCount = useStore(nodeCountSelector);
  const nodesInitialized = useStore(nodesInitializedSelector);
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();

  useEffect(() => {
    if (!nodeCount || !nodesInitialized) {
      return; // Skip if nodes aren't ready
    }

    const nodes = getNodes();
    const edges = getEdges();

    try {
      // Create hierarchy using D3's stratify
      const hierarchy = stratify<Node>()
        .id((d) => d.id)
        .parentId((d: Node) => {
          // Find parent by looking at incoming edges
          const parentEdge = edges.find((e: Edge) => e.target === d.id);
          return parentEdge?.source;
        })(nodes);

      // Apply the tree layout algorithm to the hierarchy
      const root = layout(hierarchy);

      // Update node positions based on layout results
      setNodes((nodes) =>
        nodes.map((node) => {
          const hierarchyNode = root.find((d) => d.id === node.id);
          if (!hierarchyNode) return node;

          const { x, y } = hierarchyNode;
          const newPosition = getPosition(x, y, direction);

          return {
            ...node,
            sourcePosition: positionMap[direction[1]],
            targetPosition: positionMap[direction[0]],
            position: newPosition,
            style: { opacity: 1 },
          };
        })
      );

      // Make edges visible
      setEdges((edges) =>
        edges.map((edge) => ({ ...edge, style: { opacity: 1 } }))
      );
    } catch (error) {
      console.error("Error during layout calculation:", error);
    }
  }, [
    nodeCount,
    nodesInitialized,
    getNodes,
    getEdges,
    setNodes,
    setEdges,
    direction,
  ]);
}
```

## 4. Custom Components

### 4.1 Custom Node Component

```tsx
function CustomNode({ data, sourcePosition, targetPosition }: NodeProps) {
  const [isDropzoneActive, setDropzoneActive] = useState<boolean>(false);

  // Drop zone event handlers
  const onDrop = () => setDropzoneActive(false);
  const onDragOver = (evt: DragEvent<HTMLDivElement>) => evt.preventDefault();
  const onDragEnter = () => setDropzoneActive(true);
  const onDragLeave = () => setDropzoneActive(false);

  const className = cx(styles.node, {
    [styles.nodeDropzone]: isDropzoneActive,
  });

  return (
    <div
      className={className}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <Handle
        className={styles.handle}
        type="target"
        position={targetPosition || Position.Top}
      />
      <Handle
        className={styles.handle}
        type="source"
        position={sourcePosition || Position.Bottom}
      />
      {data.label}
    </div>
  );
}
```

### 4.2 Sidebar Component

```tsx
function Sidebar() {
  const onDragStart = (nodeData: any) => (event: DragEvent) => {
    console.log("Started dragging node from sidebar", nodeData);
    const dataToTransfer = nodeData || {};
    const dataString = JSON.stringify(dataToTransfer);
    event.dataTransfer.setData("application/reactflow", dataString);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLabel}>
        You can drag nodes from the sidebar and drop them on another node
      </div>
      <div>
        <div
          onDragStart={onDragStart({ type: "Node A" })}
          draggable
          className={styles.sidebarNode}
        >
          Node A
        </div>
        {/* More node templates... */}
      </div>
    </div>
  );
}
```

## 5. Key Learnings

### 5.1 Automatic Layout Techniques

- **D3 Integration**: Learn how to use D3's hierarchical layout algorithms with React Flow
- **Dynamic Updates**: Automatically reorganize nodes when new ones are added
- **Direction Control**: Support different layout directions (TB, LR, RL, BT)

### 5.2 Drag and Drop Operations

- **Drag Source**: Create draggable elements in a sidebar
- **Drop Target**: Make nodes accept drops to create new connections
- **Data Transfer**: Pass data between drag source and drop target

### 5.3 React Flow Fundamentals

- **Node Management**: Create, position, and style nodes programmatically
- **Edge Creation**: Connect nodes with customizable edges
- **Event Handling**: Respond to node clicks, drops, and other interactions
- **Custom Node Types**: Extend React Flow with tailored node components

## 6. Implementation Patterns

### 6.1 Using Custom Hooks for Layout

The pattern of creating a dedicated hook for complex layout logic keeps your component code clean and focused on UI concerns.

### 6.2 Incremental Node Creation

When adding new nodes, they start with opacity 0 and only become visible after the layout algorithm positions them, creating a smooth transition effect.

### 6.3 Separation of Concerns

The code separates node creation (in App.tsx), layout calculation (in useAutoLayout.ts), and node appearance (in CustomNode.tsx) for better maintainability.

## 7. Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `yarn`
3. Start the development server: `npm start` or `yarn start`
4. Try creating new nodes by:
   - Clicking on existing nodes
   - Dragging templates from the sidebar onto existing nodes

## 8. Further Customization

- Modify node appearance in CustomNode.tsx
- Adjust layout parameters in useAutoLayout.ts
- Add more node types with different behavior
- Implement node deletion or edge editing functionality

This example demonstrates advanced integration of React Flow with D3 to create dynamic, interactive node-based diagrams that automatically organize themselves in a hierarchical structure.
