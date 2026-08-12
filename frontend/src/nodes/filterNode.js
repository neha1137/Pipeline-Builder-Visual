import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Filter"
      handles={[
        {
          id: 'input',
          type: 'target',
          position: Position.Left,
        },
        {
          id: 'output',
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <label>
        Condition:
        <input
          type="text"
          placeholder="age > 18"
        />
      </label>
    </BaseNode>
  );
};