import React, { useState } from 'react';

// 🟢 Card Component inside the same file (No external import needed)
function CollaborationRequestCard({ request, onAccept, onDismiss }) {
  return (
    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-white shadow-xs hover:border-slate-200 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#0f9f59]/10 text-[#0f9f59] flex items-center justify-center font-bold text-sm">
          {request.senderName ? request.senderName[0] : 'U'}
        </div>
        <div>
          <p className="text-sm text-slate-800 font-medium">
            <span className="font-semibold text-slate-900">{request.senderName}</span> {request.actionText}{' '}
            <span className="font-semibold text-[#0f9f59]">{request.targetName}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onDismiss(request.id)}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition cursor-pointer"
        >
          Dismiss
        </button>
        <button
          type="button"
          onClick={() => onAccept(request.id)}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#00a664] hover:bg-[#0f9f59] rounded-xl transition cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default function CollaborationRequests() {
  const [requests, setRequests] = useState([
    {
      id: 'req-1',
      senderName: 'Avery Chen',
      actionText: 'wants to collaborate on',
      targetName: 'OpenGrid Energy',
    },
    {
      id: 'req-2',
      senderName: 'Maya Patel',
      actionText: 'invited you to review',
      targetName: 'Mindful Campus',
    },
  ]);

  const handleAccept = (id) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDismiss = (id) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-8 font-sans">
      
      {/* Breadcrumb Navigation */}
      <div className="text-sm text-gray-500 font-medium">
        Workspace <span className="mx-1.5 text-gray-300">/</span> <span className="text-gray-900 font-semibold">Collaboration Requests</span>
      </div>

      {/* Header Banner */}
      <div className="space-y-1 pt-1">
        <span className="text-[11px] font-extrabold text-[#0f9f59] tracking-wider uppercase">
          PROJECT NEXUS
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Collaboration Requests
        </h1>
        <p className="text-sm text-gray-500 font-normal">
          Your workspace for building meaningful things.
        </p>
      </div>

      {/* Requests Section */}
      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-bold text-gray-900">
          Collaboration requests
        </h2>

        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <CollaborationRequestCard
                key={request.id}
                request={request}
                onAccept={handleAccept}
                onDismiss={handleDismiss}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center text-sm text-gray-400 bg-gray-50/50">
            No pending collaboration requests
          </div>
        )}
      </div>

    </div>
  );
}