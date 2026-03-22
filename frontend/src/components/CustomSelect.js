import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      {/* The Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '10px 12px',
          backgroundColor: '#ffffff',
          border: `1px solid ${isOpen ? '#007aff' : '#d2d2d7'}`,
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1d1d1f',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(0, 122, 255, 0.2)' : 'none',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box'
        }}
      >
        <span>{value}</span>
        <ChevronDown 
          size={16} 
          color="#86868b" 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.2s ease' 
          }} 
        />
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)', // Apple's signature glass effect
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '10px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          padding: '6px',
          zIndex: 1000, // Ensure it stays above other nodes
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                color: value === option ? '#ffffff' : '#1d1d1f',
                backgroundColor: value === option ? '#007aff' : 'transparent', // Blue highlight for selected
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.1s ease'
              }}
              onMouseEnter={(e) => {
                if (value !== option) e.target.style.backgroundColor = '#f5f5f7';
              }}
              onMouseLeave={(e) => {
                if (value !== option) e.target.style.backgroundColor = 'transparent';
              }}
            >
              <span>{option}</span>
              {value === option && <Check size={14} color="#ffffff" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};