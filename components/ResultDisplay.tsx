import React from 'react';
import { CodeBlock } from './CodeBlock';
import { Loader } from './Loader';
import type { ResultItem } from '../types';

interface ResultDisplayProps {
  results: ResultItem[];
  isLoading: boolean;
  error: string | null;
  hasOptimized: boolean;
  progressMessage: string;
  handleExport: () => void;
}

const ResultItemDisplay: React.FC<{ item: ResultItem }> = ({ item }) => (
  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-6 animate-fade-in">
    <h3 className="font-mono text-slate-400 text-sm mb-3 break-words">
      <span className="font-bold text-slate-300">INPUT:</span> {item.inputPrompt}
    </h3>
    {item.error ? (
      <div className="p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-md text-sm">
        <p><span className="font-bold">Error:</span> {item.error}</p>
      </div>
    ) : (
      <div className={`grid grid-cols-1 ${ (item.imagePrompt && item.videoPrompt) ? 'lg:grid-cols-2' : ''} gap-4`}>
        {item.imagePrompt && (
          <CodeBlock title="For Image Generation" code={JSON.stringify(item.imagePrompt, null, 2)} />
        )}
        {item.videoPrompt && (
          <CodeBlock title="For Video Generation" code={JSON.stringify(item.videoPrompt, null, 2)} />
        )}
      </div>
    )}
  </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  results,
  isLoading,
  error,
  hasOptimized,
  progressMessage,
  handleExport,
}) => {
  if (isLoading) {
    return <Loader message={progressMessage} />;
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
        <h3 className="font-bold">An Error Occurred</h3>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!hasOptimized) {
    return (
        <div className="mt-8 text-center text-slate-500 p-8 border-2 border-dashed border-slate-700 rounded-lg">
            <p className="text-lg">Your optimized prompts will appear here.</p>
        </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 animate-fade-in">
       <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-slate-200">Optimization Results</h2>
        <button
          onClick={handleExport}
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={results.every(r => r.error)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"/>
          </svg>
          Export JSON
        </button>
      </div>
      {results.map((item, index) => (
        <ResultItemDisplay key={index} item={item} />
      ))}
    </div>
  );
};
