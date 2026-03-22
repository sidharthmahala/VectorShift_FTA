import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';

const FieldLabel = ({ label }) => (
  <div style={{ fontSize: '13px', color: '#515154', fontWeight: '500', marginBottom: '8px' }}>{label}</div>
);

export const DelayNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customDelay-', 'delay_'));
  const [seconds, setSeconds] = useState(5);

  return (
    <BaseNode
      id={id}
      title="Time Delay"
      description="Pause the workflow for a specific duration."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'input', style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: 'output', style: { top: '50%' } }
      ]}
    >
      <div>
        <FieldLabel label="Delay (Seconds)" />
        <input 
          type="number" 
          value={seconds} 
          onChange={(e) => setSeconds(e.target.value)}
          min="1"
          style={{
            width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d2d2d7', outline: 'none', boxSizing: 'border-box'
          }}
        />
      </div>
    </BaseNode>
  );
};