from fastapi import FastAPI
from pydantic import BaseModel
from collections import deque
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineRequest(BaseModel):
    nodes: list
    edges: list

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):

    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # 1. Create indegree
    indegree = {
        node["id"]: 0
        for node in pipeline.nodes
    }

    # 2. Count incoming edges
    for edge in pipeline.edges:
        target = edge["target"]
        indegree[target] += 1

    # 3. Find nodes with zero incoming edges
    queue = deque(
        node_id
        for node_id, degree in indegree.items()
        if degree == 0
    )

    # 4. Process nodes
    processed_count = 0

    while queue:
        node_id = queue.popleft()
        processed_count += 1

        for edge in pipeline.edges:
            if edge["source"] == node_id:
                target = edge["target"]
                indegree[target] -= 1

                if indegree[target] == 0:
                    queue.append(target)

    # 5. DAG check
    is_dag = processed_count == num_nodes

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }