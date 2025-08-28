import React, { useState, useRef, useEffect } from 'react';
import { streamChat } from '../services/geminiService';
import type { ChatMessage, User } from '../types';
import { GenerateContentResponse } from "@google/genai";

interface AiAssistantPageProps {
  currentUser: User;
}

const AiAssistantPage: React.FC<AiAssistantPageProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const stream = await streamChat(input, currentUser);
      let fullResponse = '';
      for await (const chunk of stream as AsyncGenerator<GenerateContentResponse>) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = fullResponse;
          return newMessages;
        });
      }
    } catch (error) {
       setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = "Przepraszam, wystąpił błąd. Spróbuj ponownie później.";
          return newMessages;
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-dark">Asystent AI</h2>
        <p className="text-medium">Zadaj pytanie dotyczące firmy, procedur lub Twoich zadań.</p>
      </div>
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto bg-white rounded-lg shadow-inner p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
             {msg.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m12 3-1.9 4.2-4.2 1.9 4.2 1.9L12 15l1.9-4.2 4.2-1.9-4.2-1.9L12 3z"/><path d="M5 12_1.9-4.2-4.2-1.9 4.2-1.9 1.9 4.2z"/><path d="M19 12_1.9 4.2 4.2 1.9-4.2 1.9-1.9-4.2z"/></svg>
                </div>
             )}
            <div className={`max-w-xl p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-lg' : 'bg-gray-100 text-dark rounded-bl-lg'}`}>
              <p className="whitespace-pre-wrap">{msg.content || (isLoading && index === messages.length - 1 ? '...' : '')}</p>
            </div>
             {msg.role === 'user' && (
                <img src={currentUser.avatar} alt="User" className="w-10 h-10 rounded-full" />
             )}
          </div>
        ))}
         {isLoading && messages[messages.length-1]?.role === 'assistant' && (
            <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m12 3-1.9 4.2-4.2 1.9 4.2 1.9L12 15l1.9-4.2 4.2-1.9-4.2-1.9L12 3z"/><path d="M5 12_1.9-4.2-4.2-1.9 4.2-1.9 1.9 4.2z"/><path d="M19 12_1.9 4.2 4.2 1.9-4.2 1.9-1.9-4.2z"/></svg>
                </div>
                <div className="max-w-xl p-4 rounded-2xl bg-gray-100 text-dark rounded-bl-lg">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-medium rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-medium rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-medium rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="mt-6">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Napisz wiadomość..."
            disabled={isLoading}
            className="w-full pl-4 pr-16 py-4 text-base bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition"
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-primary rounded-full text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiAssistantPage;
