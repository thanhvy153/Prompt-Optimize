
import React from 'react';

export const Footer: React.FC = () => (
  <footer className="text-center py-4 mt-8 border-t border-slate-700/50 text-slate-500">
    <p>&copy; {new Date().getFullYear()} Prompt Optimizer. Built for creative minds.</p>
  </footer>
);
