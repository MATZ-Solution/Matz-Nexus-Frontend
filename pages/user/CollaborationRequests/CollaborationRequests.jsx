import React, { useState } from 'react';
import { Check } from 'lucide-react';

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
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-6 font-sans">



      {/* Title Banner Section */}
      <div className="space-y-1 pt-1">
        <span className="text-[11px] font-extrabold text-emerald-600 tracking-wider uppercase">
          PROJECT NEXUS
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Collaboration Requests
        </h1>
        <p className="text-sm text-gray-500 font-normal">
          Your workspace for building meaningful things.
        </p>
      </div>

      {/* Subhead & Cards Section */}
      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-bold text-gray-900">
          Collaboration requests
        </h2>

        {requests.length > 0 ? (
          <div className="space-y-3">
            {requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 px-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:border-gray-300 transition-all"
              >
                {/* Left Side: Sender & Project Details */}
                <div className="text-sm text-gray-700 font-normal">
                  <span className="font-bold text-gray-900">{request.senderName}</span>{' '}
                  <span className="text-gray-600">{request.actionText}</span>{' '}
                  <span className="font-bold text-gray-900">{request.targetName}</span>
                </div>

                {/* Right Side: Accept & Dismiss Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAccept(request.id)}
                    style={{ backgroundColor: '#00a664', color: '#ffffff' }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDismiss(request.id)}
                    className="px-3.5 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
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
