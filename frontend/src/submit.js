import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }), shallow);

    const handleSubmit = async () => {
        try {
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

            const data = await response.json();

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
                    backgroundColor: '#007aff',
                    color: '#ffffff',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease', // Smooth color fade
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0062cc'; // Darkens slightly on hover
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#007aff'; // Returns to original blue
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
};