import React, { useState } from 'react';
import './submit.css';

export const SubmitButton = ({ nodes = [], edges = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      setResult(data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      alert('Failed to submit pipeline. Make sure the backend is running.');
    }
  };

  return (
    <>
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit}>
          Submit Pipeline
        </button>
      </div>

      {showModal && result && (
        <div
          className="submit-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="submit-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h2>Pipeline submitted</h2>

            <p className="modal-description">
              Your pipeline was successfully processed.
            </p>

            <div className="result-list">
              <div className="result-row">
                <span>Nodes</span>
                <strong>{result.num_nodes ?? nodes.length}</strong>
              </div>

              <div className="result-row">
                <span>Edges</span>
                <strong>{result.num_edges ?? edges.length}</strong>
              </div>

              <div className="result-row">
                <span>Status</span>
                <strong>
                  {result.is_dag ? 'Valid DAG' : 'Invalid DAG'}
                </strong>
              </div>
            </div>

            <p className="dag-description">
              {result.is_dag
                ? 'The pipeline has no circular dependencies.'
                : 'The pipeline contains a circular dependency.'}
            </p>

            <button
              className="done-button"
              onClick={() => setShowModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};