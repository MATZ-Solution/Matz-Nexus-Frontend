import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Bell } from 'lucide-react';

export const TopBar = ({ journey = 'user', currentUserName = "Jordan Smith", onJourneyChange }) => {
  const navigate = useNavigate();

  const initials = currentUserName
    ? currentUserName.split(' ').map((n) => n[0]).join('')
    : 'JS';

  return (
    <header className="w-full bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between select-none shrink-0 font-sans">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-400">Workspace</span>
        <span className="text-sm text-slate-300">/</span>
        <span className="text-sm font-semibold text-slate-500 capitalize">
          {journey === 'admin' ? 'Admin Panel' : 'Overview'}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <button 
          type="button"
          onClick={() => navigate('/notifications')}
          className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
        >
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
            {initials}
          </div>
          <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
            {currentUserName}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-y-0.5" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;