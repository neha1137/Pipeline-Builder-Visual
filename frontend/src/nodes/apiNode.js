import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="API"
      handles={[
        {
          id: 'request',
          type: 'target',
          position: Position.Left,
        },
        {
          id: 'response',
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <label>
        URL:
        <input
          type="text"
          placeholder="https://api.example.com"
        />
      </label>

      <label>
        Method:
        <select defaultValue="GET">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
    </BaseNode>
  );
};