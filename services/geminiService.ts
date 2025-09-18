import { GoogleGenAI } from "@google/genai";
import { 
  BASE_INSTRUCTION, 
  IMAGE_PROMPT_STRUCTURE, 
  VIDEO_PROMPT_STRUCTURE, 
  FINAL_OUTPUT_INSTRUCTIONS 
} from '../constants';
import type { AspectRatio, OutputType, ResultItem } from '../types';

const getMetaPrompt = (outputType: OutputType): string => {
  let instructions = BASE_INSTRUCTION;
  if (outputType === 'image' || outputType === 'both') {
    instructions += `\n${IMAGE_PROMPT_STRUCTURE}`;
  }
  if (outputType === 'video' || outputType === 'both') {
    instructions += `\n${VIDEO_PROMPT_STRUCTURE}`;
  }
  instructions += `\n\n${FINAL_OUTPUT_INSTRUCTIONS[outputType]}`;
  return instructions;
};


export const optimizePrompts = async (userInput: string, aspectRatio: AspectRatio, outputType: OutputType): Promise<Pick<ResultItem, 'imagePrompt' | 'videoPrompt'>> => {
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

  const metaPrompt = getMetaPrompt(outputType);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: metaPrompt,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);
    
    if (outputType === 'image' && !parsedJson.imagePrompt) throw new Error("Expected 'imagePrompt' key in API response.");
    if (outputType === 'video' && !parsedJson.videoPrompt) throw new Error("Expected 'videoPrompt' key in API response.");
    if (outputType === 'both' && (!parsedJson.imagePrompt || !parsedJson.videoPrompt)) throw new Error("Expected 'imagePrompt' and 'videoPrompt' keys in API response.");

    return parsedJson;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate optimized prompts from the AI model.");
  }
};
