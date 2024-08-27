import { memo } from 'react';
import { Handle, Position, NodeToolbar, NodeProps, useStore, useReactFlow } from 'reactflow';

import useDetachNodes from './useDetachNodes';

function SimpleNode({ id, data }: NodeProps) {
  const hasParent = useStore((store) => !!store.nodeInternals.get(id)?.parentNode);
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();

  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const onDetach = () => detachNodes([id]);

  return (
    <>
      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
        {hasParent && <button onClick={onDetach}>Detach</button>}
      </NodeToolbar>
      <Handle type="target" position={Position.Left} />
      <div className="icon">△</div>
      <div className="label">{data?.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default memo(SimpleNode);
