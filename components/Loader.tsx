
import React, { useState, useEffect } from 'react';

const messages = [
  "Analyzing your creative vision...",
  "Consulting the digital muse...",
  "Crafting the perfect image prompt...",
  "Adding cinematic motion for video...",
  "Polishing the final JSON structures...",
  "Almost there, the results will be epic!",
];

export const Loader: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2500); // Change message every 2.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-8 flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
            <p className="mt-4 text-lg font-semibold text-slate-300 transition-opacity duration-500">
                {messages[messageIndex]}
            </p>
        </div>
    );
};
