import React from 'react';

const NotificationItem = ({ message, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] hover:border-slate-200 transition-all flex items-center gap-3.5 cursor-pointer"
    >
      <span className="w-2 h-2 rounded-full bg-[#0f9f59] flex-shrink-0" />
      <p className="text-xs sm:text-sm font-medium text-slate-700 leading-normal">
        {message}
      </p>
    </div>
  );
};

export default NotificationItem;