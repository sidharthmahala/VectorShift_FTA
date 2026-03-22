import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { CustomSelect } from '../components/CustomSelect';

const FieldLabel = ({ label }) => (
  <div style={{ fontSize: '13px', color: '#515154', fontWeight: '500', marginBottom: '8px' }}>{label}</div>
);

export const MathNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customMath-', 'math_'));
  const [operation, setOperation] = useState('Add');

  return (
    <BaseNode
      id={id}
      title="Math Logic"
      description="Perform calculations on incoming data."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'valueA', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'valueB', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'result', style: { top: '50%' } }
      ]}
    >
      <div>
        <FieldLabel label="Operation" />
        <CustomSelect value={operation} onChange={setOperation} options={['Add', 'Subtract', 'Multiply', 'Divide']} />
      </div>
    </BaseNode>
  );
};