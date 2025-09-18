import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Footer } from './components/Footer';
import { optimizePrompts } from './services/geminiService';
import type { AspectRatio, OutputType, ResultItem } from './types';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [outputType, setOutputType] = useState<OutputType>('image');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasOptimized, setHasOptimized] = useState<boolean>(false);
  const [progressMessage, setProgressMessage] = useState<string>('');

  const handleSubmit = useCallback(async () => {
    const promptsToProcess = userInput.split('\n').filter(p => p.trim() !== '');
    if (promptsToProcess.length === 0) {
      setError('Please enter at least one prompt idea.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);
    setHasOptimized(true);

    const newResults: ResultItem[] = [];
    for (let i = 0; i < promptsToProcess.length; i++) {
      const prompt = promptsToProcess[i];
      setProgressMessage(`Optimizing prompt ${i + 1} of ${promptsToProcess.length}: "${prompt.substring(0, 50)}..."`);
      try {
        const result = await optimizePrompts(prompt, aspectRatio, outputType);
        newResults.push({ inputPrompt: prompt, ...result });
      } catch (err) {
        console.error(`Failed to process prompt: "${prompt}"`, err);
        const errorMessage = (err instanceof Error && err.message.includes('API Key')) 
          ? 'Configuration Error: API Key is missing.'
          : 'Failed to optimize. Model may be unavailable or request blocked.';
        newResults.push({ inputPrompt: prompt, error: errorMessage });
      }
      setResults([...newResults]);
    }
    
    setProgressMessage('');
    setIsLoading(false);
  }, [userInput, aspectRatio, outputType]);

  const handleExport = useCallback(() => {
    if (results.length === 0) return;
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'optimized_prompts.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [results]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <PromptInput
            userInput={userInput}
            setUserInput={setUserInput}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            outputType={outputType}
            setOutputType={setOutputType}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <ResultDisplay
            results={results}
            isLoading={isLoading}
            error={error}
            hasOptimized={hasOptimized}
            progressMessage={progressMessage}
            handleExport={handleExport}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
