import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldLabel } from '../components/BaseNode';
import { Database } from 'lucide-react';

export const DatabaseNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customDB-', 'db_'));
  const [query, setQuery] = useState('SELECT * FROM users;');

  return (
    <BaseNode
      id={id} title="Database" icon={Database} description="Execute SQL queries."
      nodeName={currName} setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'trigger', style: { top: '50%', left: '-7px' } },
        { type: 'source', position: Position.Right, id: 'results', style: { top: '50%', right: '-7px' } }
      ]}
    >
      <div>
        <FieldLabel label="SQL Query" />
        <textarea 
          value={query} onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%', height: '50px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #d2d2d7', 
            outline: 'none', boxSizing: 'border-box', resize: 'none', fontFamily: 'monospace', fontSize: '11px', transition: 'all 0.2s ease'
          }}
          onFocus={(e) => { e.target.style.borderColor = '#007aff'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.2)'; }}
          onBlur={(e) => { e.target.style.borderColor = '#d2d2d7'; e.target.style.boxShadow = 'none'; }}
        />
      </div>
    </BaseNode>
  );
};