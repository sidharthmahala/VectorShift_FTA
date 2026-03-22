from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict

app = FastAPI()

# 1. Add CORS middleware to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (good for local development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Define the Pydantic model to parse the incoming JSON from React
class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

# 3. Change to POST and accept the PipelineData model
@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    
    # Calculate basic metrics
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # --- DAG Cycle Detection Logic ---
    
    # Build the Adjacency List from the edges
    adj_list = defaultdict(list)
    for edge in pipeline.edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target:
            adj_list[source].append(target)

    # Depth-First Search (DFS) helper function
    def is_cyclic(node_id, visited, rec_stack):
        visited.add(node_id)
        rec_stack.add(node_id) # Add to current recursion path

        for neighbor in adj_list.get(node_id, []):
            if neighbor not in visited:
                if is_cyclic(neighbor, visited, rec_stack):
                    return True
            elif neighbor in rec_stack:
                # If the neighbor is already in the current path, a cycle exists
                return True

        rec_stack.remove(node_id) # Remove from path as we backtrack
        return False

    # Check every node for cycles
    visited = set()
    rec_stack = set()
    is_dag = True # Assume it's a DAG until proven otherwise

    # Iterate over all unique node IDs
    for node in pipeline.nodes:
        node_id = node.get('id')
        if node_id not in visited:
            if is_cyclic(node_id, visited, rec_stack):
                is_dag = False
                break

    # 4. Return the exact dictionary format required
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }