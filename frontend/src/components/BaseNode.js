import { Handle, useReactFlow } from 'reactflow';
import { X } from 'lucide-react';

export const BaseNode = ({ 
  id, 
  title, 
  description, 
  nodeName, 
  setNodeName, 
  children, 
  handles = [], 
  style = {} 
}) => {
  // Access React Flow's internal state to delete nodes
  const { setNodes, setEdges } = useReactFlow();

  // This will Remove the node and edges connected to this node
  const handleDelete = () => {
    
    setNodes((nds) => nds.filter((node) => node.id !== id));
    
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div style={{
      minWidth: 300,
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid rgb(138, 138, 138)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      ...style
    }}>
      
      {/* 1. Header Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        border: '1px solid rgb(129, 129, 129)',
        borderRadius: '10px',
        margin:"10px 10px 10px 10px",
        background: '#B7BDF7'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Icon removed, just the title remains */}
          <span style={{ fontWeight: '600', fontSize: '16px', color: '#1d1d1f' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', color: '#86868b' }}>
          {/* Functional Delete Button */}
          <X 
            size={18} 
            onClick={handleDelete}
            style={{ cursor: 'pointer', transition: 'color 0.15s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ff3b30'} 
            onMouseLeave={(e) => e.currentTarget.style.color = '#86868b'}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Description */}
        {description && (
          <div style={{ fontSize: '13px', color: '#86868b', lineHeight: '1.4' }}>
            {description}
          </div>
        )}

        {/* Node Name Pill */}
        {setNodeName && (
          <input 
            type="text" 
            value={nodeName} 
            onChange={(e) => setNodeName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              backgroundColor: '#dfdfdf',
              border: '1px solid transparent',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1d1d1f',
              textAlign: 'center',
              fontWeight: '500',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#007aff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = '#f5f5f7';
              e.target.style.borderColor = 'transparent';
              e.target.style.boxShadow = 'none';
            }}
          />
        )}

        {/* Children (Dynamic inputs) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {children}
        </div>
      </div>

      {/* Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}-${index}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{
            width: '10px',
            height: '10px',
            background: '#ffffff',
            border: '3px solid #6366f1',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            ...handle.style
          }}
        />
      ))}
    </div>
  );
};