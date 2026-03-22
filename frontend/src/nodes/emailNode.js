import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldLabel, NodeInput } from '../components/BaseNode';
import { Mail } from 'lucide-react';

export const EmailNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customEmail-', 'email_'));
  const [subject, setSubject] = useState('Welcome!');

  return (
    <BaseNode
      id={id} title="Send Email" icon={Mail} description="Automate email outreach."
      nodeName={currName} setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'contact_data', style: { top: '50%', left: '-7px' } },
        { type: 'source', position: Position.Right, id: 'status', style: { top: '50%', right: '-7px' } }
      ]}
    >
      <div>
        <FieldLabel label="Email Subject" />
        <NodeInput value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
    </BaseNode>
  );
};