import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { Calculator, Info } from 'lucide-react';

const FieldLabel = ({ label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#515154', fontWeight: '500', marginBottom: '8px' }}>
    {label}
    <Info size={12} color="#86868b" />
  </div>
);

export const MathNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customMath-', 'math_'));
  const [operation, setOperation] = useState('Add');

  return (
    <BaseNode
      id={id}
      title="Math Logic"
      icon={Calculator}
      description="Perform calculations on incoming data."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'valueA', style: { top: '33%', left: '-7px' } },
        { type: 'target', position: Position.Left, id: 'valueB', style: { top: '66%', left: '-7px' } },
        { type: 'source', position: Position.Right, id: 'result', style: { top: '50%', right: '-7px' } }
      ]}
    >
      <div>
        <FieldLabel label="Operation" />
        <CustomSelect value={operation} onChange={setOperation} options={['Add', 'Subtract', 'Multiply', 'Divide']} />
      </div>
    </BaseNode>
  );
};