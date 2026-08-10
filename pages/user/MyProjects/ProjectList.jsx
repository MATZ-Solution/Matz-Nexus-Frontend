import React, { useState } from 'react';

// ✅ New PageHeader Import (Replaces raw SearchBar)
import PageHeader from "../../../src/components/shared/PageHeader.jsx";

// ProjectCard Import
import { ProjectCard } from "./ProjectCard.jsx";

const initialProjects = [
  {
    id: '1',
    title: 'Solar Grid Mesh',
    description: 'Decentralized solar energy distribution system with smart monitoring.',
    status: 'published',
    tags: ['Energy', 'IoT'],
    updatedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Aphasia Labs',
    description: 'Short description here.',
    status: 'pending_review',
    tags: ['HealthTech'],
    updatedAt: 'Yesterday',
  },
  {
    id: '3',
    title: 'Turkana Water ATM',
    description: 'Automated clean water dispensing kiosk with prepaid smart cards and remote telemetry for rural regions.',
    status: 'changes_requested',
    tags: ['Water', 'CleanTech', 'Hardware'],
    updatedAt: 'Just now',
  },
  {
    id: '4',
    title: 'Clinic Cold-Chain Sensor',
    description: 'Real-time temperature tracking for vaccine storage.',
    status: 'pending',
    tags: ['Medical'],
    updatedAt: '3 days ago',
  },
  {
    id: '5',
    title: 'Community Radio Kit',
    description: 'Low-cost transmitter hardware package.',
    status: 'rejected',
    tags: ['Telecom'],
    updatedAt: '1 week ago',
  },
];

export default function ProjectList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = initialProjects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = project.title.toLowerCase().includes(query);
    const matchesDesc = project.description?.toLowerCase().includes(query);
    const matchesTags = project.tags?.some((tag) => tag.toLowerCase().includes(query));

    return matchesTitle || matchesDesc || matchesTags;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-6 md:p-8 space-y-6">
      
      {/* ✅ Top Reusable Page Header (SearchBar + Notifications + Avatar) */}
      <PageHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        placeholder="Search projects by name, tags..."
      />

      {/* Page Heading Section */}
      <div className="max-w-7xl mx-auto pt-2">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and view your project statuses.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                status={project.status}
                tags={project.tags}
                updatedAt={project.updatedAt}
                onCardClick={(id) => console.log('Selected Project ID:', id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-sm">No projects found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

    </div>
  );
}