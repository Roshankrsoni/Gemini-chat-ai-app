import React from 'react';
import { Header } from './components/Header';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 pt-8">
        <Header onClear={clearChat} messageCount={messages.length} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <ChatContainer messages={messages} />

        <div className="sticky bottom-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
            {isLoading && (
              <div className="text-sm text-gray-500 mt-2">
                Gemini is thinking...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}