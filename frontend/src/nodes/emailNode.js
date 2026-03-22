import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { Mail, Info } from 'lucide-react';

const FieldLabel = ({ label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#515154', fontWeight: '500', marginBottom: '8px' }}>
    {label}
    <Info size={12} color="#86868b" />
  </div>
);

export const EmailNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customEmail-', 'email_'));
  const [subject, setSubject] = useState('Welcome to our platform!');

  return (
    <BaseNode
      id={id}
      title="Send Email"
      icon={Mail}
      description="Automate email outreach and notifications."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'contact_data', style: { top: '50%', left: '-7px' } },
        { type: 'source', position: Position.Right, id: 'status', style: { top: '50%', right: '-7px' } }
      ]}
    >
      <div>
        <FieldLabel label="Email Subject" />
        <input 
          type="text" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          style={{
            width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #d2d2d7', 
            outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007aff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d2d2d7';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </BaseNode>
  );
};