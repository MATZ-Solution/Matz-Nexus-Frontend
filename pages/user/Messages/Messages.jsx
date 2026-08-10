import React, { useState } from 'react';
import Button from "../../../src/components/shared/Button.jsx";

const conversations = [
  {
    id: '1',
    name: 'Tomás Freitas',
    projectRef: 'SolarGrid Mesh',
    avatarBg: 'from-amber-400 via-purple-500 to-indigo-600',
    lastMessage: "Thanks Tomás! Happy to talk...",
    messages: [
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
  },
  {
    id: '2',
    name: 'Priya Nair',
    projectRef: 'Turkana Water ATM',
    avatarBg: 'from-blue-500 to-indigo-700',
    lastMessage: 'Attached the audit.',
    messages: [
      {
        id: 'm3',
        sender: 'them',
        text: 'Attached the audit for the last quarter, take a look when you can.',
      },
    ],
  },
  {
    id: '3',
    name: 'Kwame Boateng',
    projectRef: 'Clinic Cold-Chain Sensor',
    avatarBg: 'from-emerald-400 to-teal-600',
    lastMessage: 'Sounds good, let\'s set up a call.',
    messages: [
      {
        id: 'm4',
        sender: 'them',
        text: "Loved the pitch deck. Sounds good, let's set up a call this week.",
      },
    ],
  },
];

export default function Messages() {
  const [activeChatId, setActiveChatId] = useState('1');
  const [inputText, setInputText] = useState('');
  const [chatData, setChatData] = useState(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  );

  const activeUser = conversations.find((c) => c.id === activeChatId);
  const activeMessages = chatData[activeChatId] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText.trim(),
    };

    setChatData((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));
    setInputText('');
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 p-6">
      <div className="  bg-white rounded-2xl border border-gray-200/80 shadow-sm flex overflow-hidden">

        {/* Conversations Sidebar */}
        <div className="w-100 border-r border-gray-200/80 flex flex-col shrink-0 bg-gray-50/40">
          <div className="px-4 py-4 border-b border-gray-200/80">
            <h2 className="text-sm font-bold text-gray-900">Messages</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">{conversations.length} conversations</p>
          </div>
          <div className="divide-y divide-gray-100 overflow-y-auto">
            {conversations.map((conv) => {
              const isActive = conv.id === activeChatId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveChatId(conv.id)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                    isActive ? 'bg-white' : 'hover:bg-white/60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${conv.avatarBg} shrink-0 shadow-sm ring-2 ${isActive ? 'ring-emerald-500' : 'ring-transparent'}`} />
                  <div className="overflow-hidden flex-1">
                    <h4 className="text-xs font-semibold text-gray-900 truncate">{conv.name}</h4>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Chat */}
        <div className="flex-1 flex flex-col">

          {/* Active Chat Header */}
          <div className="px-6 py-4 border-b border-gray-200/80 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${activeUser.avatarBg} shrink-0 shadow-sm`} />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{activeUser.name}</h3>
              <p className="text-[11px] text-gray-400">re: {activeUser.projectRef}</p>
            </div>
          </div>

          {/* Chat Messages List */}
          <div className="px-6 py-6 space-y-4 bg-[#fafafa]">

            {/* Connected system tag */}
            <div className="flex justify-center mb-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                You're both now connected and collaborating on {activeUser.projectRef}
              </span>
            </div>

            {activeMessages.map((msg) => {
              const isMe = msg.sender === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[65%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-emerald-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input & Send Button Section */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200/80 bg-white flex items-center gap-3">
            <input
              type="text"
              placeholder="Write a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-gray-400"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="px-6 py-2.5 text-sm font-semibold rounded-xl"
            >
              Send
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}