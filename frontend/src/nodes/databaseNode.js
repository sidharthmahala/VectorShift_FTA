import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';

const FieldLabel = ({ label }) => (
  <div style={{ fontSize: '13px', color: '#515154', fontWeight: '500', marginBottom: '8px' }}>{label}</div>
);

export const DatabaseNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customDB-', 'db_'));
  const [query, setQuery] = useState('SELECT * FROM users;');

  return (
    <BaseNode
      id={id}
      title="Database Query"
      description="Execute queries against your connected database."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'trigger', style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: 'results', style: { top: '50%' } }
      ]}
    >
      <div>
        <FieldLabel label="SQL Query" />
        <textarea 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%', height: '60px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d2d2d7', 
            outline: 'none', boxSizing: 'border-box', resize: 'none', fontFamily: 'monospace', fontSize: '12px'
          }}
        />
      </div>
    </BaseNode>
  );
};