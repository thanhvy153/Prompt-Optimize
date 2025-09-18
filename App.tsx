
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Footer } from './components/Footer';
import { optimizePrompts } from './services/geminiService';
import type { AspectRatio } from './types';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [videoPrompt, setVideoPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasOptimized, setHasOptimized] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter a prompt idea.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasOptimized(true);

    try {
      const result = await optimizePrompts(userInput, aspectRatio);
      setImagePrompt(JSON.stringify(result.imagePrompt, null, 2));
      setVideoPrompt(JSON.stringify(result.videoPrompt, null, 2));
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes('API Key is not configured')) {
        setError('Configuration Error: The Google AI API Key is missing. Please ensure it is correctly set up in the application environment.');
      } else {
        setError('Failed to optimize prompts. The model may be unavailable or the request was blocked. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [userInput, aspectRatio]);

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
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <ResultDisplay
            imagePrompt={imagePrompt}
            videoPrompt={videoPrompt}
            isLoading={isLoading}
            error={error}
            hasOptimized={hasOptimized}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
