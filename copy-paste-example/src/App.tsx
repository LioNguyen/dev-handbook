import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Edge,
  Node,
  OnConnect,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import useCopyPaste from './useCopyPaste';

import 'reactflow/dist/style.css';
import styles from './styles.module.css';

const initialNodes: Node[] = [
  { id: 'a', className: styles.node, data: { label: 'A' }, position: { x: 0, y: 0 } },
  { id: 'b', className: styles.node, data: { label: 'B' }, position: { x: 0, y: 100 } },
  { id: 'c', className: styles.node, data: { label: 'C' }, position: { x: 0, y: 200 } },
];

const initialEdges: Edge[] = [
  { id: 'a->b', source: 'a', target: 'b' },
  { id: 'b->c', source: 'b', target: 'c' },
];

const fitViewOptions = { padding: 1 };

function ReactFlowPro() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) => addEdge(connection, edges));
    },
    [setEdges]
  );

  const { cut, copy, paste, bufferedNodes } = useCopyPaste();

  const canCopy = nodes.some(({ selected }) => selected);
  const canPaste = bufferedNodes.length > 0;

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
    >
      <Panel className={styles.buttonGroup} position="top-left">
        <button className={styles.button} onClick={() => cut()} disabled={!canCopy}>
          cut
        </button>
        <button className={styles.button} onClick={() => copy()} disabled={!canCopy}>
          copy
        </button>
        <button className={styles.button} onClick={() => paste({ x: 0, y: 0 })} disabled={!canPaste}>
          paste
        </button>
      </Panel>
    </ReactFlow>
  );
}

const ReactFlowWrapper = (props: any) => {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
};

export default ReactFlowWrapper;
