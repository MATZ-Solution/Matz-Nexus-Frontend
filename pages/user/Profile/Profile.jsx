import React, { useState } from 'react';

// ✅ Reusable PageHeader Import
import PageHeader from "../../../src/components/shared/PageHeader.jsx";
import ProfileHeaderCard from "../../../src/components/Cards/ProfileHeaderCard.jsx";
import ProfileProjectCard from "../../../src/components/Cards/ProfileProjectCard.jsx";

export default function Profile() {
  const [searchQuery, setSearchQuery] = useState('');

  // 1. User Profile State Data
  const [userData] = useState({
    name: 'Amara Osei',
    role: 'RESEARCHER',
    location: 'NAIROBI, KENYA',
    bio: 'Electrical engineer working on decentralized power infrastructure for last-mile healthcare.',
    skills: ['Embedded Systems', 'Renewable Energy', 'IoT'],
    avatarGradient: 'from-amber-400 via-purple-500 to-indigo-600',
  });

  // 2. Published Projects State Data
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
    <div className="min-h-screen bg-[#f5f5f0] p-6 md:p-8 space-y-8">
      
      {/* ✅ Reusable Top Search & Header Actions */}
      <PageHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* Main Profile Content Area */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Profile Info Header */}
        <ProfileHeaderCard user={userData} />

        {/* Published Projects Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            PUBLISHED PROJECTS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProfileProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}