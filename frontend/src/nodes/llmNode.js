import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      handles={[
        {
          id: 'system',
          type: 'target',
          position: Position.Left,
          style: { top: `${100 / 3}%` },
        },
        {
          id: 'prompt',
          type: 'target',
          position: Position.Left,
          style: { top: `${200 / 3}%` },
        },
        {
          id: 'response',
          type: 'source',
          position: Position.Right,
        },
      ]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
};