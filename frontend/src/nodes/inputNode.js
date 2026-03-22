// inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { Info, LogIn } from 'lucide-react'; // <-- Imported LogIn for the header

const FieldLabel = ({ label, tag }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#515154', fontWeight: '500' }}>
      {label}
      <Info size={12} color="#86868b" />
    </div>
    {tag && (
      <span style={{ fontSize: '11px', color: '#9065B0', fontWeight: '600', backgroundColor: '#F4F0F9', padding: '2px 6px', borderRadius: '4px' }}>
        {tag}
      </span>
    )}
  </div>
);

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={LogIn} // <-- Added the icon back to the header
      description="Pass data of different types into your workflow."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[{ type: 'source', position: Position.Right, id: 'value', style: { right: '-7px' } }]}
    >
      <div>
        <FieldLabel label="Type" tag="Dropdown" />
        <CustomSelect 
          value={inputType} 
          onChange={setInputType} // <-- Optimized to pass the reference directly
          options={['Text', 'File']} 
        />
      </div>
    </BaseNode>
  );
};