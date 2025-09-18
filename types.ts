export type AspectRatio = '16:9' | '9:16';
export type OutputType = 'image' | 'video' | 'both';

export interface ResultItem {
  inputPrompt: string;
  imagePrompt?: object;
  videoPrompt?: object;
  error?: string;
}
