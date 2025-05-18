'use client';
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  role: 'user' | 'ai' | 'error';
  content: string;
}

const CHAT_ID_KEY = 'codantix-chat-id';
const CHAT_HISTORY_PREFIX = 'codantix-chat-history-';

function getOrCreateChatId() {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(CHAT_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(CHAT_ID_KEY, id);
  }
  return id;
}

function saveHistory(chatId: string, messages: Message[]) {
  localStorage.setItem(CHAT_HISTORY_PREFIX + chatId, JSON.stringify(messages));
}

function loadHistory(chatId: string): Message[] {
  const raw = localStorage.getItem(CHAT_HISTORY_PREFIX + chatId);
  if (!raw) return [
    { id: 1, role: 'ai' as const, content: 'Hello! How can I help you with Codantix today?' },
  ];
  try {
    return JSON.parse(raw) as Message[];
  } catch {
    return [
      { id: 1, role: 'ai' as const, content: 'Hello! How can I help you with Codantix today?' },
    ];
  }
}

export default function ChatPage() {
  const [chatId, setChatId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat ID and history on mount
  useEffect(() => {
    const id = getOrCreateChatId();
    setChatId(id);
    setMessages(loadHistory(id));
  }, []);

  // Save history on messages change
  useEffect(() => {
    if (chatId) saveHistory(chatId, messages);
  }, [messages, chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: messages.length + 1, role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setTyping(true);
    // Simulate AI response with delay and possible error
    setTimeout(() => {
      setTyping(false);
      if (Math.random() < 0.15) { // 15% chance of error
        setMessages(msgs => [
          ...msgs,
          { id: msgs.length + 2, role: 'error', content: 'AI failed to respond. Please try again.' },
        ]);
      } else {
        setMessages(msgs => [
          ...msgs,
          { id: msgs.length + 2, role: 'ai', content: 'This is a **placeholder** AI response.\n\n- Supports *markdown*\n- `code`\n- [links](https://codantix.com)' },
        ]);
      }
    }, 1200 + Math.random() * 1000);
  };

  const startNewChat = () => {
    const newId = crypto.randomUUID();
    localStorage.setItem(CHAT_ID_KEY, newId);
    setChatId(newId);
    const initial = [
      { id: 1, role: 'ai' as const, content: 'Hello! How can I help you with Codantix today?' },
    ];
    setMessages(initial);
    saveHistory(newId, initial);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col h-[80vh]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">AI Chat Interface</h1>
        <button
          onClick={startNewChat}
          className="px-3 py-1.5 rounded bg-gray-100 text-gray-700 font-medium hover:bg-blue-100 hover:text-blue-700 border border-gray-200 transition"
        >
          New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[80%] text-sm shadow-sm ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : msg.role === 'ai'
                  ? 'bg-white text-gray-800 border border-gray-200'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}
            >
              {msg.role === 'ai' ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : msg.role === 'error' ? (
                <span>{msg.content}</span>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="mb-3 flex justify-start">
            <div className="px-3 py-2 rounded-lg max-w-[80%] text-sm shadow-sm bg-white text-gray-400 border border-gray-200 animate-pulse">
              AI is typing…
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          disabled={typing}
        >
          Send
        </button>
      </form>
    </div>
  );
} 