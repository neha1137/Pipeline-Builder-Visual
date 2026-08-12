# Visual Pipeline Builder

The application allows users to create pipelines using drag-and-drop nodes, connect nodes together, dynamically work with text variables, and submit the resulting pipeline to a FastAPI backend for validation.

---

## Tech Stack

### Frontend

- React
- JavaScript
- React Flow
- Zustand
- CSS

### Backend

- Python
- FastAPI
- Uvicorn

---

## Project Overview

The assessment is implemented in four main parts:

1. **Node Abstraction**
2. **Styling**
3. **Text Node Logic**
4. **Backend Integration**

### Application Workflow

```text
        ┌──────────────────────┐
        │      Node Toolbar    │
        └──────────┬───────────┘
                   │
             Drag & Drop
                   │
                   ▼
        ┌──────────────────────┐
        │    React Flow Canvas │
        │                      │
        │ Input → LLM → Output │
        │          ↑           │
        │        Text          │
        └──────────┬───────────┘
                   │
                Submit
                   │
                   ▼
        ┌──────────────────────┐
        │    FastAPI Backend   │
        │                      │
        │  /pipelines/parse    │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ Pipeline Validation  │
        │                      │
        │ • Node count         │
        │ • Edge count         │
        │ • DAG validation     │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │     Result Modal     │
        │                      │
        │ Nodes:      3        │
        │ Edges:      2        │
        │ Valid DAG:  Yes      │
        └──────────────────────┘
```

---

## Directory Structure

```text
frontend_technical_assessment/
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── nodes/
│   │   │   ├── BaseNode.js
│   │   │   ├── inputNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── textNode.js
│   │   │   ├── apiNode.js
│   │   │   ├── databaseNode.js
│   │   │   ├── filterNode.js
│   │   │   ├── emailNode.js
│   │   │   └── transformNode.js
│   │   │
│   │   ├── App.js
│   │   ├── ui.js
│   │   ├── toolbar.js
│   │   ├── draggableNode.js
│   │   ├── submit.js
│   │   ├── store.js
│   │   └── ...
│   │
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/)
- npm
- Python 3
- pip

---

## Running the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm i
```

Start the development server:

```bash
npm start
```

The React application will start on the local development server.

---

## Running the Backend

Open a separate terminal and navigate to the backend directory:

```bash
cd backend
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

### Additional Dependency

If `python-multipart` is required by the FastAPI endpoint, install it with:

```bash
pip install python-multipart
```

---

## Running the Full Application

The frontend and backend need to run simultaneously.

### Terminal 1 - Backend

```bash
cd backend
uvicorn main:app --reload
```

### Terminal 2 - Frontend

```bash
cd frontend
npm i
npm start
```

Then open the frontend development URL displayed by the React development server.

---

## Using the Application

### Step 1 - Add a Node

Drag a node from the toolbar onto the React Flow canvas.

Available nodes include:

- Input
- LLM
- Output
- Text
- API
- Database
- Filter
- Email
- Transform

---

### Step 2 - Connect Nodes

Connect node handles to create a pipeline.

Example:

```text
Input → LLM → Output
```

---

### Step 3 - Configure the Nodes

Use the controls inside each node to configure its values.

---

### Step 4 - Use Text Variables

Inside a Text node, enter a variable using double curly brackets:

```text
Hello {{name}}
```

A corresponding `name` input handle will automatically appear on the left side of the Text node.

Multiple variables are supported:

```text
Hello {{name}}

Your email is {{email}}
```

This creates separate handles for:

- `name`
- `email`

---

### Step 5 - Submit the Pipeline

Click the **Submit** button.

The current nodes and edges are sent to the FastAPI backend through:

```text
POST /pipelines/parse
```

---

### Step 6 - View the Result

The backend calculates:

- Number of nodes
- Number of edges
- Whether the pipeline is a DAG

The result is displayed in a user-friendly modal:

```text
Pipeline Summary

Nodes: 3
Edges: 2
Valid DAG: Yes

Done
```

---

## Features

### Pipeline Editor

- Drag-and-drop node creation
- Node positioning
- Node connections
- React Flow canvas
- Zoom and pan controls
- MiniMap

### Node Abstraction

- Reusable `BaseNode` component
- Shared node styling
- Configurable node dimensions
- Configurable input/output handles
- Easier creation of additional node types

### Available Nodes

- Input
- Output
- LLM
- Text
- API
- Database
- Filter
- Email
- Transform

### Text Node

- Dynamic width
- Dynamic height
- `{{variable}}` syntax
- Dynamic input handles
- Duplicate variable handling
- JavaScript variable name validation

### Backend Integration

- FastAPI REST endpoint
- Node counting
- Edge counting
- DAG validation
- Frontend/backend communication
- User-friendly submission result

---

## Backend API

### `POST /pipelines/parse`

The frontend sends the current pipeline's nodes and edges to the backend.

Example request:

```json
{
  "nodes": [
    {
      "id": "input-1",
      "type": "customInput"
    },
    {
      "id": "llm-1",
      "type": "llm"
    },
    {
      "id": "output-1",
      "type": "customOutput"
    }
  ],
  "edges": [
    {
      "source": "input-1",
      "target": "llm-1"
    },
    {
      "source": "llm-1",
      "target": "output-1"
    }
  ]
}
```

Example response:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

### Response Fields

| Field | Description |
|---|---|
| `num_nodes` | Number of nodes in the pipeline |
| `num_edges` | Number of edges/connections |
| `is_dag` | Whether the pipeline is a Directed Acyclic Graph |

---

## DAG Validation

A pipeline without cycles is considered a valid Directed Acyclic Graph.

For example:

```text
Input → LLM → Output
```

returns:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

A cyclic pipeline such as:

```text
A → B
↑   ↓
└── C
```

returns:

```json
{
  "num_nodes": 3,
  "num_edges": 3,
  "is_dag": false
}
```

Disconnected nodes are also valid as long as there are no cycles.

For example:

```text
Input

Output
```

returns:

```json
{
  "num_nodes": 2,
  "num_edges": 0,
  "is_dag": true
}
```

---

## Design

The application uses a light blue and blue-gray visual design inspired by modern productivity and design tools.

The interface includes:

- Light blue-gray canvas
- White node cards
- Rounded borders
- Subtle shadows
- Consistent spacing
- Styled input fields
- Custom handles
- Styled edges
- Custom toolbar
- Styled React Flow controls
- Custom submission modal

The focus is on keeping the pipeline editor clean, readable, and easy to use.

---

## Assessment Requirements

| Requirement | Implementation |
|---|---|
| Node abstraction | Reusable `BaseNode` component |
| Original nodes | Input, Output, LLM, Text |
| Five additional nodes | API, Database, Filter, Email, Transform |
| Unified styling | Custom CSS |
| Dynamic Text width | Implemented |
| Dynamic Text height | Implemented |
| Text variables | `{{variable}}` syntax |
| Dynamic variable handles | Implemented |
| Frontend/backend integration | Implemented |
| Pipeline submission | `POST /pipelines/parse` |
| Node count | Implemented in backend |
| Edge count | Implemented in backend |
| DAG validation | Implemented in backend |
| Submission result | User-friendly modal |

---

## Development Notes

### State Management

Zustand is used to manage the pipeline state, including:

- Nodes
- Edges
- Node IDs
- Node changes
- Edge changes
- Connections

### React Flow

React Flow is responsible for the visual pipeline editor, including:

- Rendering nodes
- Rendering edges
- Node positioning
- Drag-and-drop
- Connections
- Zooming
- Panning
- Handles

### FastAPI

FastAPI provides the backend endpoint used to process and validate the submitted pipeline.

The frontend sends the current graph to the backend, and the backend returns the calculated pipeline information.

---

## Deployment

The current project is configured as a local development application.

For local development:

### Frontend

```bash
cd frontend
npm i
npm start
```

### Backend

```bash
cd backend
uvicorn main:app --reload
```

> `npm run deploy` is not included because a deployment configuration/provider was not specified as part of the assessment.

---

## Summary

This project implements the VectorShift Frontend Technical Assessment using React, React Flow, Zustand, Python, and FastAPI.

The application demonstrates:

- Reusable React component architecture
- React Flow graph-based UI
- Drag-and-drop interactions
- Dynamic node behavior
- Dynamic Text variables and handles
- Consistent UI styling
- Global state management
- REST API integration
- Pipeline node and edge analysis
- Directed Acyclic Graph validation
