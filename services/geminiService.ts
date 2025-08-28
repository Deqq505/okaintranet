// Fix: Removed Vite-specific triple-slash directive to resolve 'Cannot find type definition file' error.
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { User } from '../types';

// Fix: Updated API key retrieval to use only process.env.API_KEY as per Gemini API guidelines.
// This resolves an error where `import.meta.env` was not defined.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  // This error will appear if the API key is not set in the environment variables.
  // Check your environment variable configuration.
  throw new Error("API_KEY is not defined. Please ensure the key is set.");
}

const ai = new GoogleGenAI({ apiKey });

// In-memory store for user chat sessions
const userChatSessions = new Map<number, Chat>();

const createChatForUser = (user: User): Chat => {
  const systemInstruction = `You are a helpful and friendly AI assistant for an internal company intranet called 'OKA S.C. Intranet'. 
    The company, OKA S.C., is a construction wholesaler.
    You are currently assisting: ${user.name}, who is a(n) ${user.title}.
    Your role is to provide information about the company, its procedures, and its people. 
    You should not invent information. If you don't know the answer, say so. Keep your answers concise and professional.
    Today's date is ${new Date().toLocaleDateString()}.`;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: { systemInstruction },
  });
};

export const streamChat = async (message: string, user: User): Promise<AsyncGenerator<GenerateContentResponse>> => {
  try {
    let chat = userChatSessions.get(user.id);

    if (!chat) {
      chat = createChatForUser(user);
      userChatSessions.set(user.id, chat);
    }
    
    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Add a check for authentication errors specifically
    if (error instanceof Error && error.message.includes('API key not valid')) {
       // Fix: Made error message more generic by removing "w Vercel".
       throw new Error("Klucz API jest nieprawidłowy. Sprawdź konfigurację.");
    }
    throw new Error("Failed to get response from AI assistant.");
  }
};
