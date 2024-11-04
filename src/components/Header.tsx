import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';

interface HeaderProps {
  onClear: () => void;
  messageCount: number;
}

export function Header({ onClear, messageCount }: HeaderProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <MessageSquare size={24} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gemini Chat</h1>
            <p className="text-gray-600">
              {messageCount === 0 
                ? 'Start a new conversation' 
                : `${messageCount} messages in conversation`}
            </p>
          </div>
        </div>
        {messageCount > 0 && (
          <button
            onClick={onClear}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            title="Clear chat"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
}