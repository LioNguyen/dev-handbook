// This example shows how to implement a simple undo and redo functionality for a React Flow graph.
import React, { CSSProperties, useCallback } from 'react';
import ReactFlow, {
  Background,
  Panel,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  useReactFlow,
  NodeOrigin,
  Node,
  Edge,
  DefaultEdgeOptions,
  ProOptions,
  OnConnect,
  NodeDragHandler,
  SelectionDragHandler,
  OnNodesDelete,
  OnEdgesDelete,
} from 'reactflow';

import useUndoRedo from './useUndoRedo';

import 'reactflow/dist/style.css';
import styles from './styles.module.css';

const nodeLabels: string[] = ['Wire', 'your', 'ideas', 'with', 'React', 'Flow', '!'];

const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };
const defaultNodes: Node[] = [];
const defaultEdges: Edge[] = [];
const defaultEdgeOptions: DefaultEdgeOptions = { style: { strokeWidth: 3, stroke: '#ff0071' } };
const connectionLineStyle: CSSProperties = { strokeWidth: 2, stroke: '#ff99c7' };
const nodeOrigin: NodeOrigin = [0.5, 0.5];

function ReactFlowPro() {
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();
  const [nodes, , onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const { project, addNodes } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (connection) => {
      // 👇 make adding edges undoable
      takeSnapshot();
      setEdges((edges) => addEdge(connection, edges));
    },
    [setEdges, takeSnapshot]
  );

  const onPaneClick = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>) => {
      // 👇 make adding nodes undoable
      takeSnapshot();
      const position = project({ x: evt.clientX, y: evt.clientY });
      const label = nodeLabels.shift();
      addNodes([
        {
          id: `${new Date().getTime()}`,
          data: { label },
          position,
          className: styles.node,
        },
      ]);
      nodeLabels.push(`${label}`);
    },
    [takeSnapshot, addNodes, project]
  );

  const onNodeDragStart: NodeDragHandler = useCallback(() => {
    // 👇 make dragging a node undoable
    takeSnapshot();
    // 👉 you can place your event handlers here
  }, [takeSnapshot]);

  const onSelectionDragStart: SelectionDragHandler = useCallback(() => {
    // 👇 make dragging a selection undoable
    takeSnapshot();
  }, [takeSnapshot]);

  const onNodesDelete: OnNodesDelete = useCallback(() => {
    // 👇 make deleting nodes undoable
    takeSnapshot();
  }, [takeSnapshot]);

  const onEdgesDelete: OnEdgesDelete = useCallback(() => {
    // 👇 make deleting edges undoable
    takeSnapshot();
  }, [takeSnapshot]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={proOptions}
      onConnect={onConnect}
      onNodeDragStart={onNodeDragStart}
      onSelectionDragStart={onSelectionDragStart}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      defaultEdgeOptions={defaultEdgeOptions}
      onPaneClick={onPaneClick}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      selectNodesOnDrag={false}
    >
      <Background />
      <Controls />
      <Panel position="bottom-center">
        <div className={styles.buttonGroup}>
          <button disabled={canUndo} className={styles.button} onClick={undo}>
            <span className={styles.buttonIcon}>⤴️</span> undo
          </button>
          <button disabled={canRedo} className={styles.button} onClick={redo}>
            redo <span className={styles.buttonIcon}>⤵️</span>
          </button>
        </div>
      </Panel>
      {!nodes.length && <div className={styles.instructions}>Click anywhere on the pane to add nodes</div>}
    </ReactFlow>
  );
}

function ReactFlowWrapper(props: any) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
