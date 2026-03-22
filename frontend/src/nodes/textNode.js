import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { Type, Info } from 'lucide-react';

const FieldLabel = ({ label }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#515154', fontWeight: '500' }}>
      {label}
      <Info size={12} color="#86868b" />
    </div>
  </div>
);

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // 1. Extract valid variables
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g; 
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    
    return [...new Set(matches)]; 
  };

  // 2. Auto-resize and variable extraction
  useEffect(() => {
    setVariables(extractVariables(currText));

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.width = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      
      const newWidth = Math.max(220, textareaRef.current.scrollWidth);
      textareaRef.current.style.width = `${newWidth}px`;
    }
  }, [currText]);

  // 3. Dynamically generate handles with PERFECT alignment
  const handles = [
    // Standard output handle perfectly aligned on the right border
    { type: 'source', position: Position.Right, id: 'output', style: { right: '-7px' } }
  ];

  // Dynamically add input (target) handles perfectly aligned on the left border
  variables.forEach((variable, index) => {
    handles.push({
      type: 'target',
      position: Position.Left,
      id: `var-${variable}`,
      style: { 
        top: `${((index + 1) * 100) / (variables.length + 1)}%`,
        left: '-7px' // <--- This fixes the visual alignment and the connection hitbox!
      } 
    });
  });

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={Type}
      description="Define text with {{variables}} to create dynamic inputs."
      handles={handles}
    >
      <div>
        <FieldLabel label="Text Input" />
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Type here... e.g., Hello {{name}}"
          style={{
            minWidth: '220px',
            minHeight: '60px',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #d2d2d7',
            backgroundColor: '#ffffff',
            fontSize: '14px',
            color: '#1d1d1f',
            fontFamily: 'inherit',
            resize: 'none',
            overflow: 'hidden',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            lineHeight: '1.5',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007aff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d2d2d7';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </BaseNode>
  );
};