import { useState, useEffect, useRef } from "react";
import BaseNode from "../components/BaseNode";

const extractVariables = (text) => {
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const matches = [];
  let match;

  while ((match = regex.exec(text))) {
    matches.push(match[1]);
  }

  return [...new Set(matches)];
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef();

  useEffect(() => {
    setVariables(extractVariables(text));
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  };

  return (
    <BaseNode
      title="Text"
      inputs={variables}
      outputs={[`${id}-output`]}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        className="w-full bg-transparent border border-gray-600 rounded p-1 text-xs resize-none outline-none"
      />
    </BaseNode>
  );
};