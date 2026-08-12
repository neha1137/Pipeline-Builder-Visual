import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Transform"
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
        Operation:
        <select defaultValue="map">
          <option value="map">Map</option>
          <option value="filter">Filter</option>
          <option value="sort">Sort</option>
        </select>
      </label>

      <label>
        Expression:
        <input
          type="text"
          placeholder="item.name"
        />
      </label>
    </BaseNode>
  );
};