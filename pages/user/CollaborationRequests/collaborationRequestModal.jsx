import React, { useState } from 'react';
import axios from 'axios';

export default function CollaborationRequestModal({ isOpen, onClose, project, onRequestSent }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // LocalStorage se sender ID pick karna
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      
      // Verification: ID 5 (Muhammad) for testing
      const senderId = parsedUser?.id || 5; 

      const payload = {
        project_id: project.id, // Project ID from props
        sender_id: senderId,     // Logged in user ID
        email: email,
        message: message
      };

      console.log("Sending Payload:", payload); // Browser Console (F12) mein verify ke liye

      // Endpoint must match backend route: POST /api/collaborations/request
      const res = await axios.post('http://localhost:5000/api/collaborations/request', payload);

      if (res.data.success) {
        alert("Request Sent Successfully!");
        if (onRequestSent) onRequestSent();
        onClose();
      }
    } catch (err) {
      console.error("Error Response:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <h2 className="text-xl font-bold mb-2">Collaborate on {project?.title}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Your Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Message</label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-xs p-3 border rounded-xl"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 text-xs border rounded-xl">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-2 text-xs bg-[#0f9f59] text-white rounded-xl">
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}