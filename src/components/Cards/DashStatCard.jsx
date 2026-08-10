import React from 'react';

export default function DashStatCard({ count, label }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{count}</span>
      <span className="text-[11px] font-semibold text-gray-400 tracking-wider mt-2 uppercase">{label}</span>
    </div>
  );
}