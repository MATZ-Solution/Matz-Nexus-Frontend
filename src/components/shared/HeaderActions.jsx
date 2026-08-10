import React from 'react';

export const HeaderActions = ({ onNotificationClick, onProfileClick, avatarGradient }) => {
  return (
    <div className="flex items-center gap-3 shrink-0">
      {/* Notification Bell Icon Button */}
      <button
        type="button"
        onClick={onNotificationClick}
        className="p-2.5 rounded-xl bg-white border border-gray-200/80 text-gray-500 hover:text-gray-800 transition-colors shadow-sm cursor-pointer"
        title="Notifications"
      >
        <svg
          className="w-5 h-5 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </button>

      {/* Profile Avatar Block */}
      <div
        onClick={onProfileClick}
        className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${
          avatarGradient || 'from-amber-400 via-pink-500 to-indigo-600'
        } shadow-sm cursor-pointer hover:opacity-90 transition-opacity`}
        title="Profile"
      />
    </div>
  );
};

// ✅ Default export added so PageHeader.jsx can import it smoothly
export default HeaderActions;