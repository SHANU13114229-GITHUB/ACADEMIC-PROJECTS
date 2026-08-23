import React, { useState } from 'react';
import { ChatMessage, StudentProfile } from '../../types';
import { Send, CheckCheck, User, MessageSquare, Bot, Sparkles } from 'lucide-react';

interface MessageViewProps {
  student: StudentProfile;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const MessageView: React.FC<MessageViewProps> = ({ student, messages, onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="pb-20 p-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-700" />
            <span>Faculty & Admin Desk</span>
          </h2>
          <p className="text-xs text-gray-500">Direct Communication with HOD & Faculty</p>
        </div>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded-full">
          ● HOD Online
        </span>
      </div>

      {/* Broadcast Banner */}
      <div className="bg-purple-50 border border-purple-200 p-3 rounded-2xl flex items-center space-x-3 text-xs text-purple-950">
        <div className="w-8 h-8 rounded-full bg-purple-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
          SHEAT
        </div>
        <div>
          <p className="font-bold">SHEAT Academic Helpdesk Channel</p>
          <p className="text-[10px] text-purple-700">Send queries regarding attendance, assignments, fees or leave applications.</p>
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3 min-h-[320px] max-h-[420px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center space-x-1.5 mb-1 text-[10px] text-gray-500">
              <span className="font-bold text-gray-700">{msg.senderName}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[85%] text-xs shadow-2xs leading-relaxed ${
                msg.isMe
                  ? 'bg-purple-900 text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 border border-gray-200/80 rounded-tl-none'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="flex space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your query to Faculty / HOD..."
          className="flex-1 p-3 bg-white text-xs rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-2xs"
        />
        <button
          type="submit"
          className="bg-purple-900 hover:bg-purple-950 text-white p-3 rounded-2xl shadow-xs flex items-center justify-center transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
