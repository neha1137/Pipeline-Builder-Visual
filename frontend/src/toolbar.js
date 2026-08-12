// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="pipeline-toolbar">
      <div className="pipeline-toolbar-inner">

        <div className="toolbar-title">
          Pipeline Nodes
        </div>

        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="api" label="API" />
        <DraggableNode type="database" label="Database" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="email" label="Email" />
        <DraggableNode type="transform" label="Transform" />

      </div>
    </div>
  );
};