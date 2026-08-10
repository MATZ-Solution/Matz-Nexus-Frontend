import React, { useState } from 'react';

import PageHeader from "../../../src/components/shared/PageHeader.jsx";
import ProfileHeaderCard from "../../../src/components/Cards/ProfileHeaderCard.jsx";
import ProfileProjectCard from "../../../src/components/Cards/ProfileProjectCard.jsx";

export default function Profile() {
  const [searchQuery, setSearchQuery] = useState('');

  const [userData] = useState({
    name: 'Amara Osei',
    role: 'RESEARCHER',
    location: 'NAIROBI, KENYA',
    bio: 'Electrical engineer working on decentralized power infrastructure for last-mile healthcare.',
    skills: ['Embedded Systems', 'Renewable Energy', 'IoT'],
    avatarGradient: 'from-amber-400 via-purple-500 to-indigo-600',
  });

  const [projects] = useState([
    {
      id: 'p1',
      title: 'SolarGrid Mesh',
      description: 'Decentralized micro-grid controllers for off-grid rural clinics.',
      category: 'CleanTech',
      status: 'Published',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf9f6] to-[#f2f1ea]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 space-y-10">

        {/* Profile Info Header */}
        <ProfileHeaderCard user={userData} />

        {/* Published Projects Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Published Projects
            </h2>
            <span className="text-[11px] text-gray-400">{projects.length} total</span>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <ProfileProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-2xl py-16 flex items-center justify-center text-sm text-gray-400 bg-white/40">
              No projects published yet
            </div>
          )}
        </div>

      </div>
    </div>
  );
}