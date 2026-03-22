import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldLabel } from '../components/BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { LogOut } from 'lucide-react';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={LogOut}
      description="Output data from your workflow."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[{ type: 'target', position: Position.Left, id: 'value', style: { left: '-7px' } }]}
    >
      <div>
        <FieldLabel label="Type" />
        <CustomSelect value={outputType} onChange={setOutputType} options={['Text', 'Image']} />
      </div>
    </BaseNode>
  );
};