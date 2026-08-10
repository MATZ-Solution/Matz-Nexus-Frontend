import React, { useState } from 'react';
import PageHeader from "../../../src/components/shared/PageHeader.jsx";
import DashStatCard from "../../../src/components/Cards/DashStatCard.jsx";
import DashWidgetCard from "../../../src/components/Cards/DashWidget.jsx";

const statusBadges = {
  published: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  pending_review: 'bg-amber-50 text-amber-700 border-amber-200',
  changes_requested: 'bg-orange-50 text-orange-700 border-orange-200',
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const [stats] = useState({
    myProjectsCount: 5,
    savedProjectsCount: 12,
    collaborationRequestsCount: 3,
    unreadMessagesCount: 2,
  });

  const [projects] = useState([
    { id: '1', name: 'SolarGrid Mesh', status: 'published', statusLabel: 'Published' },
    { id: '2', name: 'Aphasia Labs', status: 'pending_review', statusLabel: 'Pending review' },
    { id: '3', name: 'Turkana Water ATM', status: 'changes_requested', statusLabel: 'Changes requested' },
  ]);

  const [collabRequests] = useState([
    {
      id: 'c1',
      senderName: 'Tomás Freitas',
      role: 'Investor',
      actionText: 'wants to offer investment on',
      projectTarget: 'SolarGrid Mesh',
      timeAgo: '2 hours ago',
    },
    {
      id: 'c2',
      senderName: 'Marco Bellini',
      role: 'Mentor',
      actionText: 'is offering mentorship on',
      projectTarget: 'SolarGrid Mesh',
      timeAgo: '3 days ago',
    },
  ]);

  const [notifications] = useState([
    {
      id: 'n1',
      text: 'Your project Turkana Water ATM needs changes',
      timeAgo: '3 days ago',
    },
    {
      id: 'n2',
      text: 'New message from Priya Nair',
      timeAgo: '4 hours ago',
    },
  ]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-6 md:p-8 space-y-8">
      
      {/* ✅ Reusable Top Search & Header Actions */}
      <PageHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        placeholder="Search projects, skills, people..."
      />

      {/* Greeting Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Amara</h1>
      </div>

      {/* 4 Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashStatCard count={stats.myProjectsCount} label="MY PROJECTS" />
        <DashStatCard count={stats.savedProjectsCount} label="SAVED PROJECTS" />
        <DashStatCard count={stats.collaborationRequestsCount} label="COLLABORATION REQUESTS" />
        <DashStatCard count={stats.unreadMessagesCount} label="UNREAD MESSAGES" />
      </div>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: My Projects */}
        <div className="lg:col-span-7">
          <DashWidgetCard title="My projects">
            {projects.map((project) => (
              <div key={project.id} className="py-4 first:pt-2 last:pb-0 flex items-center justify-between">
                <span className="font-semibold text-gray-800 text-sm">
                  {project.name}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadges[project.status]}`}>
                  {project.statusLabel}
                </span>
              </div>
            ))}
          </DashWidgetCard>
        </div>

        {/* Right Column: Collaboration Requests & Notifications */}
        <div className="lg:col-span-5 space-y-6">
          
          <DashWidgetCard title="Collaboration requests">
            {collabRequests.map((req) => (
              <div key={req.id} className="py-4 first:pt-2 last:pb-0 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">{req.senderName}</span>{' '}
                    <span className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-600 text-[10px] rounded font-mono">
                      {req.role}
                    </span>{' '}
                    {req.actionText} <span className="font-medium text-gray-900">{req.projectTarget}</span>
                  </p>
                  <p className="text-[11px] text-gray-400">{req.timeAgo}</p>
                </div>
              </div>
            ))}
          </DashWidgetCard>

          <DashWidgetCard title="Notifications">
            {notifications.map((item) => (
              <div key={item.id} className="py-4 first:pt-2 last:pb-0 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                <div className="space-y-1">
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    {item.text}
                  </p>
                  <p className="text-[11px] text-gray-400">{item.timeAgo}</p>
                </div>
              </div>
            ))}
          </DashWidgetCard>

        </div>

      </div>
    </div>
  );
}