import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, Check } from 'lucide-react';
import Button from "../../../src/components/shared/Button.jsx";

const conversations = [
  {
    id: '1',
    name: 'Tomás Freitas',
    projectRef: 'SolarGrid Mesh',
    avatarBg: 'from-amber-400 via-purple-500 to-indigo-600',
    lastMessage: "Thanks Tomás! Happy to talk...",
    time: '2:41 PM',
    unread: 0,
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: "Hi Amara — I saw SolarGrid Mesh on Nexus. I'd like to discuss a possible investment.",
        time: '2:12 PM',
      },
      {
        id: 'm2',
        sender: 'me',
        text: "Thanks Tomás! Happy to talk. We're raising $85k for the pilot expansion.",
        time: '2:41 PM',
      },
    ],
  },
  {
    id: '2',
    name: 'Priya Nair',
    projectRef: 'Turkana Water ATM',
    avatarBg: 'from-blue-500 to-indigo-700',
    lastMessage: 'Attached the audit.',
    time: '11:05 AM',
    unread: 2,
    messages: [
      {
        id: 'm3',
        sender: 'them',
        text: 'Attached the audit for the last quarter, take a look when you can.',
        time: '11:05 AM',
      },
    ],
  },
  {
    id: '3',
    name: 'Kwame Boateng',
    projectRef: 'Clinic Cold-Chain Sensor',
    avatarBg: 'from-emerald-400 to-teal-600',
    lastMessage: "Sounds good, let's set up a call.",
    time: 'Yesterday',
    unread: 0,
    messages: [
      {
        id: 'm4',
        sender: 'them',
        text: "Loved the pitch deck. Sounds good, let's set up a call this week.",
        time: 'Yesterday',
      },
    ],
  },
];

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Messages() {
  const [activeChatId, setActiveChatId] = useState('1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatData, setChatData] = useState(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  );
  const scrollRef = useRef(null);

  const activeUser = conversations.find((c) => c.id === activeChatId);
  const activeMessages = chatData[activeChatId] || [];

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.projectRef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages, activeChatId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatData((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }));
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-96px)] flex items-stretch justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl border border-gray-200/80 shadow-sm flex overflow-hidden">

        {/* Conversations Sidebar */}
        <div className="w-[320px] border-r border-gray-200/80 flex flex-col shrink-0 bg-gray-50/40">
          <div className="px-4 py-4 border-b border-gray-200/80 space-y-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Messages</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {conversations.length} conversations
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => {
                const isActive = conv.id === activeChatId;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveChatId(conv.id)}
                    className={`p-4 flex items-center gap-3 cursor-pointer transition-colors relative ${
                      isActive ? 'bg-white' : 'hover:bg-white/70'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-600" />
                    )}

                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-tr ${conv.avatarBg} shrink-0 shadow-sm flex items-center justify-center text-white text-[11px] font-semibold ring-2 ${
                        isActive ? 'ring-emerald-500' : 'ring-transparent'
                      }`}
                    >
                      {getInitials(conv.name)}
                    </div>

                    <div className="overflow-hidden flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-semibold text-gray-900 truncate">
                          {conv.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 shrink-0">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p className="text-[11px] text-gray-400 truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-semibold flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-xs text-gray-400">
                No conversations found
              </div>
            )}
          </div>
        </div>

        {/* Active Chat */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Active Chat Header */}
          <div className="px-6 py-4 border-b border-gray-200/80 flex items-center gap-3 shrink-0">
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-tr ${activeUser.avatarBg} shrink-0 shadow-sm flex items-center justify-center text-white text-[11px] font-semibold`}
            >
              {getInitials(activeUser.name)}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{activeUser.name}</h3>
              <p className="text-[11px] text-gray-400 truncate">re: {activeUser.projectRef}</p>
            </div>
          </div>

          {/* Chat Messages List */}
          <div ref={scrollRef} className="flex-1 px-6 py-6 space-y-4 bg-[#fafafa] overflow-y-auto">

            {/* Connected system tag */}
            <div className="flex justify-center mb-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium px-3 py-1.5 rounded-full text-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                You're both now connected and collaborating on {activeUser.projectRef}
              </span>
            </div>

            {activeMessages.map((msg) => {
              const isMe = msg.sender === 'me';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%] md:max-w-[65%]`}>
                    <div
                      className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        isMe
                          ? 'bg-emerald-600 text-white rounded-2xl rounded-br-md'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1 mt-1 px-1">
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                      {isMe && <Check className="w-3 h-3 text-emerald-500" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input & Send Button Section */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-200/80 bg-white flex items-center gap-3 shrink-0"
          >
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
              disabled={!inputText.trim()}
              className="px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}
