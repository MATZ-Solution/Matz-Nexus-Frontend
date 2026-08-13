import React, { useState } from 'react';
import ProfileHeaderCard from "../../../src/components/Cards/ProfileHeaderCard.jsx";

export default function Profile() {
  const [userData] = useState({
    name: 'Jordan Smith',
    initials: 'JS',
    role: 'Builder',
    location: 'San Francisco, CA',
    bio: 'Building practical climate and energy solutions with curious, mission-driven teams.',
    stats: {
      projects: 0,
      collaborations: 12,
      views: 248,
    },
  });

  return (
    <div className="w-full min-h-screen bg-[#fafafa] p-6 md:p-10 space-y-8 font-sans">
      
      {/* 🟢 Screen Main Header */}
      <div className="space-y-1">
        <p className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
          PROJECT NEXUS
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Profile Overview
        </h1>
        <p className="text-sm text-slate-500 font-normal">
          Your workspace for building meaningful things.
        </p>
      </div>

      {/* 🟢 Section Header & Profile Card */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Profile overview
        </h2>

        <ProfileHeaderCard user={userData} />
      </div>

    </div>
  );
}