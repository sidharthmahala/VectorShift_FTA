// llmNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';

export const LLMNode = ({ id, data }) => {
  // Added a name state so it matches the consistent styling of other nodes
  const [currName, setCurrName] = useState(data?.llmName || id.replace('customLLM-', 'llm_'));

  const handles = [
    // Two inputs on the left, spaced out evenly
    { type: 'target', position: Position.Left, id: 'system', style: { top: '33%', left: '-7px' } },
    { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%', left: '-7px' } },
    // One output on the right
    { type: 'source', position: Position.Right, id: 'response', style: { right: '-7px' } }
  ];

  return (
    <BaseNode
      id={id}
      title="LLM"
      description="A large language model to process text and generate responses."
      nodeName={currName}
      setNodeName={setCurrName}
      handles={handles}
    >
      <div style={{ 
        padding: '12px', 
        backgroundColor: '#f5f5f7', 
        borderRadius: '8px',
        fontSize: '13px',
        color: '#515154',
        textAlign: 'center'
      }}>
        <span>Model: <b>GPT-4</b></span>
      </div>
    </BaseNode>
  );
};