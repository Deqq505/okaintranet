import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { User } from '../types';

const apiKey = process.env.API_KEY;

// Export a check for the App to use, preventing a hard crash on startup.
export const isApiKeyConfigured = !!apiKey;

// Initialize the AI client. Calls will fail if apiKey is missing,
// which is handled in the streamChat function.
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
  if (!isApiKeyConfigured) {
    console.error("Gemini API Error: API_KEY is not configured.");
    throw new Error("Klucz API nie jest skonfigurowany. Skontaktuj się z administratorem.");
  }
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
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("Klucz API jest nieprawidłowy. Sprawdź konfigurację.");
    }
    throw new Error("Failed to get response from AI assistant.");
  }
};