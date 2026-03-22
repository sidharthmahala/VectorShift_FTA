import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldLabel, NodeInput } from '../components/BaseNode';
import { CustomSelect } from '../components/CustomSelect';
import { Globe } from 'lucide-react';

export const ApiNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.nodeName || id.replace('customApi-', 'api_'));
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com');

  return (
    <BaseNode
      id={id} title="API Request" icon={Globe} description="Make HTTP requests."
      nodeName={currName} setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'trigger', style: { top: '50%', left: '-7px' } },
        { type: 'source', position: Position.Right, id: 'response', style: { top: '50%', right: '-7px' } }
      ]}
    >
      <div>
        <FieldLabel label="Method" />
        <CustomSelect value={method} onChange={setMethod} options={['GET', 'POST', 'PUT', 'DELETE']} />
      </div>
      <div>
        <FieldLabel label="Endpoint URL" />
        <NodeInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
      </div>
    </BaseNode>
  );
};