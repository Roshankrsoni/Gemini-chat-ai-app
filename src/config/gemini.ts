import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing VITE_GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const chat = genAI.getGenerativeModel({ model: 'gemini-pro' }).startChat({
  history: [],
  generationConfig: {
    maxOutputTokens: 1000,
    temperature: 0.7,
  },
});