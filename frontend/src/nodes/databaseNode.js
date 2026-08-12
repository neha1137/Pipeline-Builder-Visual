import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Database"
      handles={[
        {
          id: 'query',
          type: 'target',
          position: Position.Left,
        },
        {
          id: 'result',
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <label>
        Database:
        <select defaultValue="PostgreSQL">
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MySQL">MySQL</option>
          <option value="MongoDB">MongoDB</option>
        </select>
      </label>

      <label>
        Query:
        <input
          type="text"
          placeholder="SELECT * FROM users"
        />
      </label>
    </BaseNode>
  );
};