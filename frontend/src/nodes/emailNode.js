import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const EmailNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Email"
      handles={[
        {
          id: 'input',
          type: 'target',
          position: Position.Left,
        },
        {
          id: 'sent',
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <label>
        To:
        <input
          type="email"
          placeholder="user@example.com"
        />
      </label>

      <label>
        Subject:
        <input
          type="text"
          placeholder="Subject"
        />
      </label>
    </BaseNode>
  );
};