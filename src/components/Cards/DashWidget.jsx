import React from 'react';

export default function DashWidget({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
      <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-4 mb-2">{title}</h3>
      <div className="divide-y divide-gray-100">
        {children}
      </div>
    </div>
  );
}