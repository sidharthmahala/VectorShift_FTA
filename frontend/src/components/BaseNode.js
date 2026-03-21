import { Handle, Position } from "reactflow";

const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div className="bg-[#111827] text-white rounded-md shadow-md p-3 min-w-[200px] relative">

      {/* Title */}
      <div className="text-sm font-semibold mb-2">{title}</div>

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={index}
          type="target"
          position={Position.Left}
          id={input}
          style={{ top: 40 + index * 20 }}
        />
      ))}

      {/* Content */}
      <div className="text-xs">{children}</div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={index}
          type="source"
          position={Position.Right}
          id={output}
          style={{ top: 40 + index * 20 }}
        />
      ))}
    </div>
  );
};

export default BaseNode;