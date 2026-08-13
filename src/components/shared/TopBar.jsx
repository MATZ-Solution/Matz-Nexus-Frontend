import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Bell, LogOut, User } from 'lucide-react';
import NotificationItem from '/src/components/shared/NotificationItem';

const notificationData = [
  { id: 1, message: 'Your project matched with 8 new collaborators' },
  { id: 2, message: 'Avery Chen accepted your collaboration request' },
  { id: 3, message: 'New project launched in Climate & Energy' },
  { id: 4, message: 'Your profile was viewed 12 times this week' },
];

export const TopBar = ({ journey = 'user', currentUserName = "Jordan Smith", onJourneyChange }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const initials = currentUserName
    ? currentUserName.split(' ').map((n) => n[0]).join('')
    : 'JS';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-slate-100 px-8 py-3.5 flex items-center justify-between select-none shrink-0 font-sans relative">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-400">Workspace</span>
        <span className="text-sm text-slate-300">/</span>
        <span className="text-sm font-semibold text-slate-500 capitalize">
          {journey === 'admin' ? 'Admin Panel' : 'Overview'}
        </span>
      </div>

      <div className="flex items-center gap-5">
        {/* Notification Bell + Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {notificationData.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#0f9f59] rounded-full" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-900">Notifications</span>
              </div>
              <div className="max-h-72 overflow-y-auto p-2 space-y-1">
                {notificationData.map((item) => (
                  <NotificationItem
                    key={item.id}
                    message={item.message}
                    onClick={() => {
                      console.log(`Notification clicked: ${item.id}`);
                      setNotifOpen(false);
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  navigate('/notifications');
                  setNotifOpen(false);
                }}
                className="w-full text-center text-xs font-semibold text-[#0f9f59] py-2.5 border-t border-slate-100 hover:bg-slate-50 cursor-pointer"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile + Dropdown */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
              {initials}
            </div>
            <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
              {currentUserName}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </div>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden py-1">
              <button
                type="button"
                onClick={() => {
                  navigate('/profile');
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <User className="w-4 h-4 text-slate-400" />
                Profile Overview
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log('Logout clicked');
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;