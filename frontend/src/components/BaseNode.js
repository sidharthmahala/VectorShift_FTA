import { Handle, useReactFlow } from 'reactflow';
import { X, Info } from 'lucide-react';

// ---------------------------------------------------------
// 1. THE MAIN WRAPPER COMPONENT
// ---------------------------------------------------------
export const BaseNode = ({ id, title, icon: Icon, description, nodeName, setNodeName, children, handles = [], style = {} }) => {
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div style={{
      width: 220, 
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)',
      border: '2px solid rgb(176, 170, 255)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      ...style
    }}>
      
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', border: '1px solid rgb(138, 138, 138)',
        borderRadius: '8px', margin: "6px", background: '#B7BDF7'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {Icon && <Icon size={14} color="#1d1d1f" />}
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#1d1d1f' }}>{title}</span>
        </div>
        <X size={14} onClick={handleDelete} style={{ cursor: 'pointer' }} color="#86868b" />
      </div>

      {/* Content */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {description && <div style={{ fontSize: '11px', color: '#86868b', lineHeight: '1.3' }}>{description}</div>}
        
        {/* Node Name Field - Using the reusable component with custom props! */}
        {setNodeName && (
          <NodeInput 
            value={nodeName} 
            onChange={(e) => setNodeName(e.target.value)} 
            bg="#dfdfdf" 
            align="center" 
            borderColor="transparent" 
          />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
          style={{ width: '10px', height: '10px', background: '#ffffff', border: '3px solid #6366f1', ...handle.style }}
        />
      ))}
    </div>
  );
};

// ---------------------------------------------------------
// 2. REUSABLE UI COMPONENTS FOR ALL NODES
// ---------------------------------------------------------

export const FieldLabel = ({ label }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#515154', fontWeight: '500' }}>
      {label}
      <Info size={12} color="#86868b" />
    </div>
  </div>
);

export const NodeInput = ({ value, onChange, type = "text", placeholder = "", min, bg = "#ffffff", align = "left", borderColor = "#d2d2d7" }) => (
  <input 
    type={type} value={value} onChange={onChange} placeholder={placeholder} min={min}
    style={{
      width: '100%', padding: '6px 8px', backgroundColor: bg,
      border: `1px solid ${borderColor}`, borderRadius: '6px', fontSize: '12px',
      color: '#1d1d1f', textAlign: align, fontWeight: '500', outline: 'none', 
      transition: 'all 0.2s ease', boxSizing: 'border-box'
    }}
    onFocus={(e) => {
      e.target.style.backgroundColor = '#ffffff';
      e.target.style.borderColor = '#007aff';
      e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.2)';
    }}
    onBlur={(e) => {
      e.target.style.backgroundColor = bg;
      e.target.style.borderColor = borderColor;
      e.target.style.boxShadow = 'none';
    }}
  />
);