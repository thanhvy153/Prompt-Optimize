
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center p-6 border-b border-slate-700/50 shadow-lg bg-gray-900/50 backdrop-blur-sm">
    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-transparent bg-clip-text">
      Prompt Optimizer
    </h1>
    <p className="text-slate-400 mt-2 text-lg">
      Transform your ideas into masterfully crafted prompts for AI image and video generation.
    </p>
  </header>
);
