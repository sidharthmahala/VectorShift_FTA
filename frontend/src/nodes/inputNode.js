import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldLabel } from '../components/BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { LogIn } from 'lucide-react';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={LogIn}
      description="Pass data into your workflow."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[{ type: 'source', position: Position.Right, id: 'value', style: { right: '-7px' } }]}
    >
      <div>
        <FieldLabel label="Type" />
        <CustomSelect value={inputType} onChange={setInputType} options={['Text', 'File']} />
      </div>
    </BaseNode>
  );
};