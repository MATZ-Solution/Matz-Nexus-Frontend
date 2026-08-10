import React, { useState } from 'react';

// Reusable Top Header Component Import
import PageHeader from "../../../src/components/shared/PageHeader.jsx";

const reports = [
  {
    id: 1,
    user: 'Priya Nair',
    action: 'reported the project',
    target: '"QuickCap Loans"',
    reason: 'for misleading funding claims',
    time: 'Yesterday',
  },
  {
    id: 2,
    user: 'Diego Ramos',
    action: 'reported a user',
    target: '',
    reason: 'for spam messaging',
    time: '2 days ago',
  },
  {
    id: 3,
    user: 'Sara de Vries',
    action: 'flagged',
    target: '"Community Radio Kit"',
    reason: 'as a duplicate listing',
    time: '3 weeks ago',
  },
];

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-6 md:p-8 space-y-8">
      
      {/* 1. Reusable Top Header */}
      <PageHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        placeholder="Search users, projects, reports..."
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          3 open reports
        </h1>

        {/* Reports Card Container */}
        <div className="bg-white border border-gray-200/80 rounded-xl shadow-sm p-6 space-y-6">
          {reports.map((report, index) => (
            <div
              key={report.id}
              className={`flex items-start justify-between pb-6 ${
                index !== reports.length - 1 ? 'border-b border-gray-100' : 'pb-0'
              }`}
            >
              {/* Left Content */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded bg-[#723225] shrink-0 mt-0.5 text-white flex items-center justify-center font-semibold text-xs">
                  {report.user.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-gray-800 leading-relaxed">
                    <span className="font-bold text-gray-900">{report.user}</span>{' '}
                    <span className="text-gray-600">{report.action}</span>{' '}
                    {report.target && (
                      <span className="font-bold text-gray-900">{report.target} </span>
                    )}
                    <span className="text-gray-600">{report.reason}</span>
                  </p>
                  <span className="text-[11px] text-gray-400 font-medium block mt-1">
                    {report.time}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button className="px-3 py-1.5 rounded text-xs font-semibold bg-[#923324] text-white hover:bg-[#78281b] shadow-sm transition-all active:scale-95">
                  Investigate
                </button>
                <button className="px-3 py-1.5 rounded text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all active:scale-95">
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}