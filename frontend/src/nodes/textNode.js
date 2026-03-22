import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode, FieldLabel } from '../components/BaseNode';
import { Type } from 'lucide-react';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || ''); 
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g; 
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) { matches.push(match[1]); }
    return [...new Set(matches)]; 
  };

  useEffect(() => {
    setVariables(extractVariables(currText));
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handles = [{ type: 'source', position: Position.Right, id: 'output', style: { right: '-7px' } }];
  variables.forEach((variable, index) => {
    handles.push({
      type: 'target', position: Position.Left, id: `var-${variable}`,
      style: { top: `${((index + 1) * 100) / (variables.length + 1)}%`, left: '-7px' } 
    });
  });

  return (
    <BaseNode id={id} title="Text" icon={Type} description="Define text with {{variables}}." handles={handles}>
      <div style={{ width: '100%' }}>
        <FieldLabel label="Text Input" />
        <textarea
          ref={textareaRef} value={currText} onChange={(e) => setCurrText(e.target.value)}
          placeholder="e.g., Hello {{name}}"
          style={{
            width: '100%', minHeight: '40px', padding: '6px 8px', borderRadius: '6px',
            border: '1px solid #d2d2d7', backgroundColor: '#ffffff', fontSize: '12px',
            color: '#1d1d1f', fontFamily: 'inherit', resize: 'none', overflow: 'hidden',
            outline: 'none', boxSizing: 'border-box', wordWrap: 'break-word', transition: 'all 0.2s ease'
          }}
          onFocus={(e) => { e.target.style.borderColor = '#007aff'; e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.2)'; }}
          onBlur={(e) => { e.target.style.borderColor = '#d2d2d7'; e.target.style.boxShadow = 'none'; }}
        />
      </div>
    </BaseNode>
  );
};