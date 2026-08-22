import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollaborationRequestCard from './CollaborationRequestCard';

export default function CollaborationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Safe LocalStorage Retrieval to prevent application crash
  const [currentUserId] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      const parsed = stored ? JSON.parse(stored) : null;
      return parsed?.id || 1; // Real logged-in user ID or fallback
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return 1;
    }
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/collaborations/incoming/${currentUserId}`);
        if (response.data.success) {
          setRequests(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchRequests();
    }
  }, [currentUserId]);

  const handleAccept = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/collaborations/accept/${id}`);
      if (response.data.success) {
        setRequests((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDismiss = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/collaborations/dismiss/${id}`);
      if (response.data.success) {
        setRequests((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error dismissing request:', error);
    }
  };

  if (loading) {
    return <div className="p-6 text-sm text-gray-500">Loading requests...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-6 font-sans">
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

      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-bold text-gray-900">
          Collaboration requests
        </h2>

        {requests.length > 0 ? (
          <div className="space-y-3">
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