import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

// NOTE: 'useNavigate' hata diya hai kyunke ye component kisi Router
// context ke bahar render ho raha tha, jiski wajah se navbar hi
// crash ho kar gayab ho raha tha. Ab simple navigation use ho rahi hai.
// Agar aapke app mein react-router-dom Router already wrap kar raha
// hai, to neeche `onExit` prop pass kar ke apna navigate function bhi
// de sakte hain (optional).

function AdminOverview({ onExit }) {
  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      window.location.href = '/';
    }
  };

  // 1. Stat Cards Data
  const stats = [
    { value: '1,248', label: 'Registered users' },
    { value: '86', label: 'Active projects' },
    { value: '42', label: 'Pending reviews' },
    { value: '94%', label: 'Trust score' },
  ];

  // 2. Moderation Queue Data
  const moderationQueue = [
    { id: 1, title: 'OpenGrid Energy', type: 'New project' },
    { id: 2, title: 'Mindful Campus', type: 'Profile update' },
    { id: 3, title: 'Northstar Grid', type: 'Collaboration report' },
  ];

  // 3. Recent Platform Activity Data
  const recentActivities = [
    { id: 1, text: '32 new projects this week' },
    { id: 2, text: '18 users completed profiles' },
    { id: 3, text: '7 projects reached team capacity' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fbfcfd] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">

        {/* Top Navigation Bar (Logo + Exit Button) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Project Nexus</h2>
              <p className="text-xs text-slate-400 font-normal">Innovation ecosystem</p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 bg-white px-4 py-2 text-sm font-medium cursor-pointer transition-all shadow-sm"
            onClick={handleExit}
          >
            Exit admin
          </button>
        </div>

        {/* Super Admin Title Banner */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            <span>Super admin</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Platform overview
          </h1>
        </div>

        {/* 4 Stat Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-sm space-y-1.5 sm:space-y-2">
              <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-normal text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Two Grid Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: Moderation queue */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-900">Moderation queue</h3>

            <div className="space-y-3">
              {moderationQueue.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f8fafc] rounded-2xl p-4 flex items-center justify-between gap-3"
                >
                  <p className="text-xs sm:text-sm text-slate-700 font-normal min-w-0">
                    <span className="font-semibold text-slate-900">{item.title}</span>
                    <span className="text-slate-400"> · {item.type}</span>
                  </p>
                  <button
                    type="button"
                    className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs py-1.5 px-3.5 rounded-xl font-medium shrink-0 cursor-pointer transition-all shadow-sm"
                    onClick={() => console.log('Review item:', item.title)}
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Recent platform activity */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-900">Recent platform activity</h3>

            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-[#f8fafc] rounded-2xl p-4 flex items-center justify-between gap-3"
                >
                  <p className="text-xs sm:text-sm text-slate-700 font-normal min-w-0">{activity.text}</p>
                  <button
                    type="button"
                    className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs py-1.5 px-3.5 rounded-xl font-medium shrink-0 cursor-pointer transition-all shadow-sm"
                    onClick={() => console.log('Review activity:', activity.id)}
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminOverview;
