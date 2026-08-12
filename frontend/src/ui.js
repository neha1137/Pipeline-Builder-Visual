// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { FilterNode } from './nodes/filterNode';
import { EmailNode } from './nodes/emailNode';
import { TransformNode } from './nodes/transformNode';

import { SubmitButton } from './submit';

import 'reactflow/dist/style.css';

const gridSize = 20;

const proOptions = {
  hideAttribution: true,
};

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,

  api: APINode,
  database: DatabaseNode,
  filter: FilterNode,
  email: EmailNode,
  transform: TransformNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    const nodeData = {
      id: nodeID,
      nodeType: `${type}`,
    };

    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper.current.getBoundingClientRect();

      const data = event.dataTransfer.getData(
        'application/reactflow'
      );

      if (!data) {
        return;
      }

      const appData = JSON.parse(data);

      const type = appData?.nodeType;

      // Check if dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Make sure React Flow has initialized
      if (!reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [
      reactFlowInstance,
      getNodeID,
      addNode,
    ]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div
        ref={reactFlowWrapper}
        className="pipeline-canvas"
        style={{
          width: '100vw',
          height: '70vh',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background
            color="#cbdbea"
            gap={gridSize}
          />

          <Controls />

          <MiniMap />
        </ReactFlow>

        {/* Submit button + result modal */}
        <SubmitButton
          nodes={nodes}
          edges={edges}
        />
      </div>
    </>
  );
};