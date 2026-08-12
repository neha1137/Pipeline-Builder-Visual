import { Handle } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  children,
  handles = [],
  width = 200,
  height = 80,
}) => {
  return (
    <div
      style={{
        width,
        minHeight: height,
        border: '1px solid #cbdbea',
        borderRadius: 12,
        gap:6,
        background: '#ffffff',
        padding: 15,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}

      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#263b52',
          marginBottom: 10,
        }}
      >
        <div>{title}</div>
        
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};