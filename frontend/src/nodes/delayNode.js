import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldLabel, NodeInput } from '../components/BaseNode';
import { Timer } from 'lucide-react';

export const DelayNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customDelay-', 'delay_'));
  const [seconds, setSeconds] = useState(5);

  return (
    <BaseNode
      id={id} title="Time Delay" icon={Timer} description="Pause the workflow."
      nodeName={currName} setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'input', style: { top: '50%', left: '-7px' } },
        { type: 'source', position: Position.Right, id: 'output', style: { top: '50%', right: '-7px' } }
      ]}
    >
      <div>
        <FieldLabel label="Delay (Seconds)" />
        <NodeInput type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} min="1" />
      </div>
    </BaseNode>
  );
};