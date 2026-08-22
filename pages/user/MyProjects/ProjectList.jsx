  import React, { useState } from "react";
import PublishProjectModal from "./PublishProjectModal.jsx";
import ProjectCard from "../../../src/components/Cards/ProjectCard.jsx";
import ProjectDetailCard from "../../../src/components/shared/ProjectDetailCard";
import { Sparkles } from "lucide-react";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (selectedProject) {
    return (
      <ProjectDetailCard 
        project={selectedProject} 
        onBackToProjects={() => setSelectedProject(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-8 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold text-[#0f9f59] tracking-wider uppercase">
            PROJECT NEXUS
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            My Projects
          </h1>
          <p className="text-sm text-gray-500 font-normal">
            Your workspace for building meaningful things.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: '#00a664', color: '#ffffff' }}
          className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm active:scale-95"
        >
          <span className="text-lg leading-none font-normal">+</span>
          <span>Publish project</span>
        </button>
      </div>

      {/* Projects Grid / Empty View */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">My projects</h2>
          <button className="text-sm font-semibold text-[#0f9f59] hover:text-[#00a664] cursor-pointer transition-colors">
            View all
          </button>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-200 rounded-2xl bg-white p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0f9f59] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">
                Your project shelf is empty
              </h3>
              <p className="text-sm text-gray-500">
                Publish an idea and invite collaborators to help it grow.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: '#00a664', color: '#ffffff' }}
              className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer mt-2"
            >
              Explore projects
            </button>
          </div>
        )}
      </div>

      <PublishProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}