import { useState, useCallback } from 'react';
import { chat } from '../config/gemini';
import type { ChatState, Message } from '../types';

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const createMessage = (role: Message['role'], content: string): Message => ({
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: Date.now(),
  });

  const sendMessage = useCallback(async (content: string) => {
    const userMessage = createMessage('user', content);

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const result = await chat.sendMessage(content);
      const response = await result.response;
      const assistantMessage = createMessage('assistant', response.text());

      setState(prev => ({
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error 
          ? error.message 
          : 'Failed to get response from Gemini',
      }));
    }
  }, []);

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    sendMessage,
    clearChat,
  };
}