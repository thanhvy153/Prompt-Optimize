
import React, { useState } from 'react';

interface CodeBlockProps {
  title: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ title, code }) => {
  const [copyText, setCopyText] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy'), 2000);
  };
  
  const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
    </svg>
  );

  return (
    <div className="bg-slate-900/70 border border-slate-700 rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      <div className="flex justify-between items-center p-3 bg-slate-800 border-b border-slate-700">
        <h3 className="font-semibold text-slate-300">{title}</h3>
        <button
          onClick={handleCopy}
          className={`px-3 py-1 text-xs rounded-md flex items-center gap-2 transition-colors duration-200 ${
            copyText === 'Copied!' 
            ? 'bg-green-600/80 text-white' 
            : 'bg-slate-600 hover:bg-slate-500 text-slate-200'
          }`}
        >
          {copyText === 'Copied!' ? <CheckIcon/> : <CopyIcon/>}
          {copyText}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto text-pink-300 whitespace-pre-wrap flex-grow">
        <code>{code}</code>
      </pre>
    </div>
  );
};
