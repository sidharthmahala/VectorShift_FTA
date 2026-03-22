// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    // 1. Extract nodes and edges from the global store
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }), shallow);

    // 2. The function that runs when you click submit
    const handleSubmit = async () => {
        try {
            // Send the data to the FastAPI backend
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch from backend');
            }

            // Parse the response
            const data = await response.json();

            // 3. Display the user-friendly alert with the results
            alert(
                `📊 Pipeline Analysis Complete!\n` +
                `-----------------------------------\n` +
                `Nodes Count: ${data.num_nodes}\n` +
                `Edges Count: ${data.num_edges}\n` +
                `Is a valid DAG: ${data.is_dag ? '✅ Yes' : '❌ No (Cycle Detected)'}`
            );

        } catch (error) {
            console.error("Submission Error:", error);
            alert("Error: Could not connect to the backend. Make sure your FastAPI server is running.");
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <button 
                type="button" 
                onClick={handleSubmit}
                style={{
                    backgroundColor: '#007aff', // Classic iOS Blue
                    color: '#ffffff',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '8px', // Smooth pill shape
                    cursor: 'pointer',
                    
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}