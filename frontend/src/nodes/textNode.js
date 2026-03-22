import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';

// Reusable label component to match the premium UI
const FieldLabel = ({ label }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
    <div style={{ fontSize: '13px', color: '#515154', fontWeight: '500' }}>
      {label}
    </div>
  </div>
);

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // 1. Extract valid variables from the text using Regex
  const extractVariables = (text) => {
    // Matches letters, numbers, _, and $ inside {{ }}
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g; 
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]); // Push the extracted variable name
    }
    
    // Return a unique array to avoid duplicate handles for the same variable
    return [...new Set(matches)]; 
  };

  // 2. Auto-resize logic and variable extraction trigger
  useEffect(() => {
    // Extract variables whenever text changes
    setVariables(extractVariables(currText));

    // Auto-resize the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.width = 'auto';  // Reset width
      
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      
      // Allow width to grow, but set a minimum constraint to keep it looking good
      const newWidth = Math.max(220, textareaRef.current.scrollWidth);
      textareaRef.current.style.width = `${newWidth}px`;
    }
  }, [currText]);

  // 3. Dynamically generate handles
  const handles = [
    // The standard output handle on the right
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  // Add a new target handle on the left for every extracted variable
  variables.forEach((variable, index) => {
    handles.push({
      type: 'target',
      position: Position.Left,
      id: `var-${variable}`,
      // Distribute the handles evenly along the left side
      style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` } 
    });
  });

  return (
    <BaseNode
      id={id}
      title="Text"
      description="Define text with {{variables}} to create dynamic inputs."
      handles={handles} // Pass the dynamic handles array to the BaseNode
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
            resize: 'none', // Disables the manual HTML resize corner
            overflow: 'hidden', // Hides the scrollbar
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