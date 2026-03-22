// outputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { CustomSelect } from '../components/CustomSelect';

// Reusable label component
const FieldLabel = ({ label, tag }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
    <div style={{ fontSize: '13px', color: '#515154', fontWeight: '500' }}>
      {label}
    </div>
    {tag && (
      <span style={{ fontSize: '11px', color: '#9065B0', fontWeight: '600', backgroundColor: '#F4F0F9', padding: '2px 6px', borderRadius: '4px' }}>
        {tag}
      </span>
    )}
  </div>
);

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      description="Output data of different types from your workflow."
      nodeName={currName}
      setNodeName={setCurrName}
      // Target handle on the left
      handles={[{ type: 'target', position: Position.Left, id: 'value', style: { left: '-7px' } }]}
    >
      <div>
        <FieldLabel label="Type" tag="Dropdown" />
        <CustomSelect 
          value={outputType} 
          onChange={(newValue) => setOutputType(newValue)} 
          options={['Text', 'Image']} 
        />
      </div>
    </BaseNode>
  );
};