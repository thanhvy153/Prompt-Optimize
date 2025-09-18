import { GoogleGenAI } from "@google/genai";
import { META_PROMPT } from '../constants';
import type { AspectRatio } from '../types';

export const optimizePrompts = async (userInput: string, aspectRatio: AspectRatio): Promise<{ imagePrompt: object, videoPrompt: object }> => {
  // Add a check for the API key.
  if (!process.env.API_KEY) {
    throw new Error("API Key is not configured. Please ensure the API_KEY environment variable is set.");
  }

  // Instantiate the client inside the function.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  const fullPrompt = `
User Prompt: "${userInput}"
Aspect Ratio: "${aspectRatio}"
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: META_PROMPT,
        responseMimeType: "application/json",
        // The responseSchema has been removed to simplify the request to the model.
        temperature: 0.7,
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    if (parsedJson.imagePrompt && parsedJson.videoPrompt) {
        return parsedJson;
    } else {
        throw new Error("Invalid JSON structure received from the API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate optimized prompts from the AI model.");
  }
};