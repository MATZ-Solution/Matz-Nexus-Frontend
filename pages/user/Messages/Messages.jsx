import React, { useState } from 'react';
// ✅ New PageHeader Import
import PageHeader from "../../../src/components/shared/PageHeader.jsx";
import Button from "../../../src/components/shared/Button.jsx";

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatId, setActiveChatId] = useState('1');
  const [inputText, setInputText] = useState('');

  // 1. Conversations List Data (State for Backend Integration)
  const [conversations] = useState([
    {
      id: '1',
      name: 'Tomás Freitas',
      lastMessage: 'Happy to discuss terms...',
      projectRef: 'SolarGrid Mesh',
      avatarBg: 'from-amber-400 via-purple-500 to-indigo-600',
    },
    {
      id: '2',
      name: 'Priya Nair',
      lastMessage: 'Attached the audit.',
      projectRef: 'Turkana Water ATM',
      avatarBg: 'from-blue-500 to-indigo-700',
    },
  ]);

  // 2. Chat Messages Data grouped by Conversation ID
  const [messages, setMessages] = useState({
    '1': [
      {
        id: 'm1',
        sender: 'them',
        text: "Hi Amara — I saw SolarGrid Mesh on Nexus. I'd like to discuss a possible investment.",
      },
      {
        id: 'm2',
        sender: 'me',
        text: "Thanks Tomás! Happy to talk. We're raising $85k for the pilot expansion.",
      },
    ],
    '2': [
      {
        id: 'm3',
        sender: 'them',
        text: 'Attached the audit.',
      },
    ],
  });

  const activeUser = conversations.find((c) => c.id === activeChatId) || conversations[0];
  const activeMessages = messages[activeChatId] || [];

  // Message Send Handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText.trim(),
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));

    setInputText('');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-6 md:p-8 space-y-6">
      
      {/* ✅ Reusable Top Search & Header Actions */}
      <PageHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* Main Messages Layout Box */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[580px]">
        
        {/* Left Column: Conversations Sidebar */}
        <div className="w-full md:w-80 border-r border-gray-200/80 flex flex-col shrink-0 bg-gray-50/30">
          <div className="divide-y divide-gray-100 overflow-y-auto">
            {conversations.map((conv) => {
              const isActive = conv.id === activeChatId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveChatId(conv.id)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-indigo-50/70 border-l-4 border-indigo-600'
                      : 'hover:bg-gray-100/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${conv.avatarBg} shrink-0 shadow-sm`} />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{conv.name}</h4>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Chat Box */}
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Active Chat Header */}
          <div className="p-4 border-b border-gray-200/80 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${activeUser.avatarBg} shrink-0 shadow-sm`} />
            <div>
              <h3 className="text-xs font-bold text-gray-900">{activeUser.name}</h3>
              <p className="text-[11px] text-gray-400 font-mono">re: {activeUser.projectRef}</p>
            </div>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[420px]">
            {activeMessages.map((msg) => {
              const isMe = msg.sender === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[65%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-xs shadow-sm'
                        : 'bg-gray-100/90 text-gray-800 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input & Send Button Section */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200/80 bg-gray-50/20 flex items-center gap-3">
            <input
              type="text"
              placeholder="Write a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-200/80 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-400 shadow-sm"
            />
            {/* Reusable Button component */}
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="px-6 py-2.5 text-xs font-bold rounded-xl"
            >
              Send
            </Button>
          </form>

        </div>

      </div>
    </div>
  );
}