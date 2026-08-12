import { useMemo, useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(
    data?.text || '{{input}}'
  );

  const textareaRef = useRef(null);

  const variables = useMemo(() => {
    const matches = currText.match(/{{\s*[\w]+\s*}}/g) || [];

    return [
      ...new Set(
        matches.map((match) =>
          match.replace(/{{|}}/g, '').trim()
        )
      ),
    ];
  }, [currText]);

  const handles = variables.map((variable, index) => ({
    id: variable,
    type: 'target',
    position: Position.Left,
    style: {
      top: `${((index + 1) / (variables.length + 1)) * 100}%`,
    },
  }));

  /*
   * Automatically adjust textarea height
   */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  /*
   * Width grows with content but stays within limits
   */
  const width = Math.max(
    200,
    Math.min(400, 120 + currText.length * 4)
  );

  /*
   * Height is based on actual textarea content
   */
  const height = Math.max(
    100,
    textareaRef.current?.scrollHeight
      ? textareaRef.current.scrollHeight + 55
      : 100
  );

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={handles}
      width={width}
      height={height}
    >
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        style={{
          width: '100%',
          minHeight: '50px',
          resize: 'none',
          overflow: 'hidden',
          boxSizing: 'border-box',
          border: '1px solid #cbdbea',
          borderRadius: '6px',
          padding: '8px',
          fontFamily: 'inherit',
        }}
        placeholder="Enter text..."
      />
    </BaseNode>
  );
};