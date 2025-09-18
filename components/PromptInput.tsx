
import React from 'react';
import type { AspectRatio } from '../types';

interface PromptInputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (value: AspectRatio) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  userInput,
  setUserInput,
  aspectRatio,
  setAspectRatio,
  handleSubmit,
  isLoading,
}) => {
  const AspectRatioButton: React.FC<{ value: AspectRatio }> = ({ value }) => {
    const isActive = aspectRatio === value;
    const label = value === '16:9' ? 'Landscape' : 'Portrait';
    return (
      <button
        onClick={() => setAspectRatio(value)}
        className={`flex-1 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 ${
          isActive
            ? 'bg-purple-600 text-white shadow-md'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        {value} ({label})
      </button>
    );
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
      <label htmlFor="prompt-input" className="block text-lg font-medium text-slate-300 mb-2">
        Enter your prompt idea
      </label>
      <textarea
        id="prompt-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="e.g., A cyborg skeleton glowing with golden electricity in a futuristic city..."
        className="w-full h-32 p-3 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-slate-200 placeholder-slate-500 resize-none"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <span className="block text-sm font-medium text-slate-300 mb-2 sm:mb-0 sm:inline sm:mr-4">Aspect Ratio:</span>
          <div className="flex gap-2 w-full sm:w-auto">
             <AspectRatioButton value="16:9" />
             <AspectRatioButton value="9:16" />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !userInput}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
        >
           {isLoading ? (
             <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Optimizing...
             </>
           ) : 'Optimize Prompt ✨'}
        </button>
      </div>
    </div>
  );
};
