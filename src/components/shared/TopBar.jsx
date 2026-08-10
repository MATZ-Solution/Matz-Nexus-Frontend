import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Bell } from 'lucide-react';

export const TopBar = ({ journey = 'user', currentUserName = "Amara Osei", onJourneyChange }) => {
  const navigate = useNavigate();

  const handleJourneySwitch = (newJourney) => {
    if (onJourneyChange) onJourneyChange(newJourney);
    if (newJourney === 'admin') {
      navigate('/admin/overview');
    } else {
      navigate('/');
    }
  };

  // User initials for avatar badge
  const initials = currentUserName
    ? currentUserName.split(' ').map((n) => n[0]).join('')
    : 'AO';

  return (
    <header className="w-full bg-white border-b border-slate-100 px-6 py-2.5 flex items-center justify-between select-none shrink-0 font-sans shadow-2xs">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-slate-400">Workspace</span>
        <span className="text-xs text-slate-300">/</span>
        <span className="text-xs font-semibold text-slate-700 capitalize">
          {journey === 'admin' ? 'Admin Panel' : 'Overview'}
        </span>
      </div>

      {/* Center: Journey Switcher */}
      <div className="bg-slate-100/80 p-1 rounded-xl flex items-center gap-1 border border-slate-200/50">
        <button
          type="button"
          onClick={() => handleJourneySwitch('user')}
          className={`px-3.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
            journey === 'user'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          User Journey
        </button>

        <button
          type="button"
          onClick={() => handleJourneySwitch('admin')}
          className={`px-3.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
            journey === 'admin'
              ? 'bg-[#0f9f59] text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Super Admin
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Button */}
        <button 
          type="button"
          onClick={() => navigate('/notifications')} // <-- ROUTE NAVIGATE FIXED
          className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#0f9f59] rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-100 cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shadow-xs">
            {initials}
          </div>
          <span className="text-xs font-semibold text-slate-800 group-hover:text-slate-900">
            {currentUserName}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-y-0.5" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;