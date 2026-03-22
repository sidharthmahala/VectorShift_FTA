import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { BrainCircuit } from 'lucide-react';

export const LLMNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.llmName || id.replace('customLLM-', 'llm_'));

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={BrainCircuit}
      description="Process text and generate responses."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%', left: '-7px' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%', left: '-7px' } },
        { type: 'source', position: Position.Right, id: 'response', style: { right: '-7px' } }
      ]}
    >
      <div style={{ padding: '8px', backgroundColor: '#f5f5f7', borderRadius: '6px', fontSize: '12px', color: '#515154', textAlign: 'center' }}>
        <span>Model: <b>GPT-4</b></span>
      </div>
    </BaseNode>
  );
};