import React, { MouseEvent, DragEvent, useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  ReactFlowProvider,
  useReactFlow,
  Background,
  BackgroundVariant,
  useStoreApi,
  MarkerType,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
} from 'reactflow';

import Sidebar from './Sidebar';
import SimpleNode from './SimpleNode';
import GroupNode from './GroupNode';
import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import { sortNodes, getId, getNodePositionInsideParent } from './utils';
import SelectedNodesToolbar from './SelectedNodesToolbar';

import 'reactflow/dist/style.css';
import '@reactflow/node-resizer/dist/style.css';

import styles from './style.module.css';

const proOptions = {
  hideAttribution: true,
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const nodeTypes = {
  node: SimpleNode,
  group: GroupNode,
};

const defaultEdgeOptions = {
  style: {
    strokeWidth: 2,
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

function DynamicGrouping() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((edge: Edge | Connection) => setEdges((eds) => addEdge(edge, eds)), [setEdges]);
  const { project, getIntersectingNodes } = useReactFlow();
  const store = useStoreApi();

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (wrapperRef.current) {
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      let position = project({ x: event.clientX - wrapperBounds.x - 20, y: event.clientY - wrapperBounds.top - 20 });
      const nodeStyle = type === 'group' ? { width: 400, height: 200 } : undefined;

      const intersections = getIntersectingNodes({
        x: position.x,
        y: position.y,
        width: 40,
        height: 40,
      }).filter((n) => n.type === 'group');
      const groupNode = intersections[0];

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
        style: nodeStyle,
      };

      if (groupNode) {
        // if we drop a node on a group node, we want to position the node inside the group
        newNode.position = getNodePositionInsideParent(
          {
            position,
            width: 40,
            height: 40,
          },
          groupNode
        ) ?? { x: 0, y: 0 };
        newNode.parentNode = groupNode?.id;
        newNode.extent = groupNode ? 'parent' : undefined;
      }

      // we need to make sure that the parents are sorted before the children
      // to make sure that the children are rendered on top of the parents
      const sortedNodes = store.getState().getNodes().concat(newNode).sort(sortNodes);
      setNodes(sortedNodes);
    }
  };

  const onNodeDragStop = useCallback(
    (_: MouseEvent, node: Node) => {
      if (node.type !== 'node' && !node.parentNode) {
        return;
      }

      const intersections = getIntersectingNodes(node).filter((n) => n.type === 'group');
      const groupNode = intersections[0];

      // when there is an intersection on drag stop, we want to attach the node to its new parent
      if (intersections.length && node.parentNode !== groupNode?.id) {
        const nextNodes: Node[] = store
          .getState()
          .getNodes()
          .map((n) => {
            if (n.id === groupNode.id) {
              return {
                ...n,
                className: '',
              };
            } else if (n.id === node.id) {
              const position = getNodePositionInsideParent(n, groupNode) ?? { x: 0, y: 0 };

              return {
                ...n,
                position,
                parentNode: groupNode.id,
                extent: 'parent' as 'parent',
              };
            }

            return n;
          })
          .sort(sortNodes);

        setNodes(nextNodes);
      }
    },
    [getIntersectingNodes, setNodes, store]
  );

  const onNodeDrag = useCallback(
    (_: MouseEvent, node: Node) => {
      if (node.type !== 'node' && !node.parentNode) {
        return;
      }

      const intersections = getIntersectingNodes(node).filter((n) => n.type === 'group');
      const groupClassName = intersections.length && node.parentNode !== intersections[0]?.id ? 'active' : '';

      setNodes((nds) => {
        return nds.map((n) => {
          if (n.type === 'group') {
            return {
              ...n,
              className: groupClassName,
            };
          } else if (n.id === node.id) {
            return {
              ...n,
              position: node.position,
            };
          }

          return { ...n };
        });
      });
    },
    [getIntersectingNodes, setNodes]
  );

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.rfWrapper} ref={wrapperRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onDrop={onDrop}
          onDragOver={onDragOver}
          proOptions={proOptions}
          fitView
          selectNodesOnDrag={false}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Background color="#bbb" gap={50} variant={BackgroundVariant.Dots} />
          <SelectedNodesToolbar />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function Flow() {
  return (
    <ReactFlowProvider>
      <DynamicGrouping />
    </ReactFlowProvider>
  );
}
