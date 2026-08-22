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
    { id: 'n1', text: 'Your project Turkana Water ATM needs changes', timeAgo: '3 days ago' },
    { id: 'n2', text: 'New message from Priya Nair', timeAgo: '4 hours ago' },
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f5f0] px-3 py-4 sm:px-6 sm:py-6 md:p-8 space-y-5 sm:space-y-8">

      {/* Top search & header actions */}
      <PageHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search projects, skills, people..."
      />

      {/* Greeting */}
      <div className="w-full max-w-7xl mx-auto min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
          Welcome back, Amara
        </h1>
      </div>

      {/* Stats */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <DashStatCard count={stats.myProjectsCount} label="MY PROJECTS" />
        <DashStatCard count={stats.savedProjectsCount} label="SAVED PROJECTS" />
        <DashStatCard count={stats.collaborationRequestsCount} label="COLLABORATION REQUESTS" />
        <DashStatCard count={stats.unreadMessagesCount} label="UNREAD MESSAGES" />
      </div>

      {/* Main grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">

        {/* Left: My projects */}
        <div className="min-w-0 w-full lg:col-span-7">
          <DashWidgetCard title="My projects">
            {projects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-3 first:pt-2 last:pb-0 sm:py-4"
              >
                <span className="min-w-0 break-words text-xs sm:text-sm font-semibold text-gray-800">
                  {project.name}
                </span>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium sm:px-3 sm:text-xs ${statusBadges[project.status]}`}
                >
                  {project.statusLabel}
                </span>
              </div>
            ))}
          </DashWidgetCard>
        </div>

        {/* Right: Requests & notifications */}
        <div className="min-w-0 w-full space-y-4 sm:space-y-6 lg:col-span-5">

          <DashWidgetCard title="Collaboration requests">
            {collabRequests.map((req) => (
              <div key={req.id} className="flex items-start gap-3 py-3 first:pt-2 last:pb-0 sm:py-4">
                <div className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 mt-0.5" />
                <div className="min-w-0 space-y-1">
                  <p className="break-words text-[11px] sm:text-xs leading-relaxed text-gray-700">
                    <span className="font-bold text-gray-900">{req.senderName}</span>{' '}
                    <span className="whitespace-nowrap rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-600">
                      {req.role}
                    </span>{' '}
                    {req.actionText}{' '}
                    <span className="font-medium text-gray-900">{req.projectTarget}</span>
                  </p>
                  <p className="text-[11px] text-gray-400">{req.timeAgo}</p>
                </div>
              </div>
            ))}
          </DashWidgetCard>

          <DashWidgetCard title="Notifications">
            {notifications.map((item) => (
              <div key={item.id} className="flex items-start gap-3 py-3 first:pt-2 last:pb-0 sm:py-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                <div className="min-w-0 space-y-1">
                  <p className="break-words text-[11px] sm:text-xs font-medium leading-relaxed text-gray-700">
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
