import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';

const FieldLabel = ({ label }) => (
  <div style={{ fontSize: '13px', color: '#515154', fontWeight: '500', marginBottom: '8px' }}>{label}</div>
);

export const EmailNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customEmail-', 'email_'));
  const [subject, setSubject] = useState('Welcome to our platform!');

  return (
    <BaseNode
      id={id}
      title="Send Email"
      description="Automate email outreach and notifications."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'contact_data', style: { top: '50%' } },
        { type: 'source', position: Position.Right, id: 'status', style: { top: '50%' } }
      ]}
    >
      <div>
        <FieldLabel label="Email Subject" />
        <input 
          type="text" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          style={{
            width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d2d2d7', outline: 'none', boxSizing: 'border-box'
          }}
        />
      </div>
    </BaseNode>
  );
};