
import React from 'react';
import { CodeBlock } from './CodeBlock';
import { Loader } from './Loader';

interface ResultDisplayProps {
  imagePrompt: string;
  videoPrompt: string;
  isLoading: boolean;
  error: string | null;
  hasOptimized: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  imagePrompt,
  videoPrompt,
  isLoading,
  error,
  hasOptimized,
}) => {
  if (isLoading) {
    return <Loader />;
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

  if (!imagePrompt && !videoPrompt) {
    return null; // Don't render anything if there's no data and not loading/error
  }

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <CodeBlock title="For Image Generation" code={imagePrompt} />
      <CodeBlock title="For Video Generation" code={videoPrompt} />
    </div>
  );
};
