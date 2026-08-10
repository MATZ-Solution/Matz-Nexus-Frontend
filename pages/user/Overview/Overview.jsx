import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProjectGrid from '../../../src/components/Cards/ProjectGrid';
import PublishProjectModal from './PublishProjectModal';
import ProjectDetailCard from '../../../src/components/shared/ProjectDetailCard';

const Overview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("Opening Modal...");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing Modal...");
    setIsModalOpen(false);
  };

  if (selectedProject) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-8 font-sans pb-10 relative">
        <ProjectDetailCard 
          project={selectedProject} 
          onBackToProjects={() => setSelectedProject(null)} 
        />

        <PublishProjectModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    );
  }
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 font-sans pb-10 relative">
      
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#0f9f59] uppercase tracking-wider">
            PROJECT NEXUS
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Your workspace for building meaningful things.
          </p>
        </div>

        {/* Header Action Button */}
        <button 
          type="button"
          onClick={handleOpenModal}
          style={{ backgroundColor: '#0f9f59' }}
          className="hover:opacity-90 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer relative z-20 pointer-events-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        <div 
          style={{ backgroundColor: '#0f9f59', borderRadius: '24px' }}
          className="lg:col-span-2 text-white p-8 flex flex-col justify-between items-start min-h-[220px] shadow-sm relative z-10"
        >
          <div className="space-y-3">
            <p className="text-xs text-emerald-100 font-medium">
              Good morning, Amara Osei
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold leading-snug max-w-md tracking-normal">
              Build what matters with the right people.
            </h2>
          </div>

          <button 
            type="button"
            onClick={handleOpenModal}
            className="mt-6 bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer border-none relative z-30 pointer-events-auto"
          >
            <span>Start a project</span>
            <Plus className="w-3.5 h-3.5 text-slate-900 stroke-[2.5]" />
          </button>
        </div>

        <div 
          style={{ borderRadius: '24px' }}
          className="bg-white p-8 border border-slate-200/80 flex flex-col justify-center items-start shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] min-h-[220px] space-y-4"
        >
          <span className="text-xs font-medium text-slate-400">
            Your ecosystem
          </span>
          <div className="space-y-2">
            <span className="text-5xl font-bold text-slate-900 block leading-none">
              4
            </span>
            <p className="text-xs text-slate-400 font-medium">
              projects to explore
            </p>
          </div>
        </div>

      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">
            Recommended for you
          </h3>
          <button 
            type="button"
            style={{ color: '#0f9f59' }}
            className="text-xs font-semibold hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            View all
          </button>
        </div>

        <ProjectGrid onSelectProject={(project) => setSelectedProject(project)} />
      </div>

      <PublishProjectModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

    </div>
  );
};

export default Overview;