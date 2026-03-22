import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { Globe, Info } from 'lucide-react';

const FieldLabel = ({ label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#515154', fontWeight: '500', marginBottom: '8px' }}>
    {label}
    <Info size={12} color="#86868b" />
  </div>
);

export const ApiNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customApi-', 'api_'));
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com/data');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon={Globe}
      description="Make HTTP requests to external services."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'trigger', style: { top: '50%', left: '-7px' } },
        { type: 'source', position: Position.Right, id: 'response', style: { top: '50%', right: '-7px' } }
      ]}
    >
      <div>
        <FieldLabel label="Method" />
        <CustomSelect value={method} onChange={setMethod} options={['GET', 'POST', 'PUT', 'DELETE']} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <FieldLabel label="Endpoint URL" />
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
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