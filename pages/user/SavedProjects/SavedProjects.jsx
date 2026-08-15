import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import ProjectDetailCard from '../../../src/components/shared/ProjectDetailCard';

const allSampleProjects = [
  {
    id: 1,
    category: 'Climate & Energy',
    title: 'OpenGrid Energy',
    description: 'Making renewable energy accessible to every community through an open, intelligent grid.',
    tags: ['Energy', 'Climate', 'Open source'],
    stage: 'Prototype',
    location: 'United Kingdom',
    match: 94,
  },
  {
    id: 2,
    category: 'Health & Wellness',
    title: 'MediRoute',
    description: 'A smarter way for remote communities to access preventative healthcare and local support.',
    tags: ['Healthcare', 'Mobile', 'Impact'],
    stage: 'MVP',
    location: 'Kenya',
    match: 88,
  },
  {
    id: 3,
    category: 'Education',
    title: 'Classroom OS',
    description: 'The collaborative workspace helping teachers make learning more personal for every student.',
    tags: ['EdTech', 'SaaS', 'Teachers'],
    stage: 'Early Revenue',
    location: 'Canada',
    match: 82,
  },
];

export default function SavedProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const [savedProjectIds, setSavedProjectIds] = useState(() => {
    const saved = localStorage.getItem('nexus_saved_projects');
    return saved ? JSON.parse(saved) : [1]; 
  });

  useEffect(() => {
    localStorage.setItem('nexus_saved_projects', JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  const handleToggleSave = (projectOrId) => {
    const id = typeof projectOrId === 'object' ? projectOrId.id : projectOrId;
    setSavedProjectIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const savedProjects = allSampleProjects.filter((p) =>
    savedProjectIds.includes(p.id)
  );

  // 🟢 Agar koi project click hua hai to Detail Screen dikhao
  if (selectedProject) {
    return (
      <ProjectDetailCard
        project={selectedProject}
        onBackToProjects={() => setSelectedProject(null)}
        isSaved={savedProjectIds.includes(selectedProject.id)}
        onToggleSave={() => handleToggleSave(selectedProject.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="p-8 md:p-10 space-y-8 max-w-7xl">
        {/* Header Title Block */}
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold text-[#00a664] tracking-wider uppercase">
            PROJECT NEXUS
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Saved Projects
          </h1>
          <p className="text-sm text-slate-400 font-normal">
            Your workspace for building meaningful things.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="space-y-4 pt-2">
          <h2 className="text-base font-bold text-slate-900">
            Saved projects
          </h2>

          {savedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProjects.map((project) => {
                const isSaved = savedProjectIds.includes(project.id);
                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 cursor-pointer group"
                  >
                    {/* Card Top: Category Badge & Bookmark Icon */}
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-50 text-[#00a664] text-xs font-semibold px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // 🟢 Detail view open sharpen hone se rokne ke liye
                          handleToggleSave(project.id);
                        }}
                        className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                        title={isSaved ? "Remove from saved" : "Save project"}
                      >
                        <Bookmark
                          className={`w-5 h-5 ${
                            isSaved ? 'fill-[#00a664] text-[#00a664]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00a664] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Card Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-slate-50 text-slate-500 text-[11px] font-medium px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                      <span>
                        {project.stage} · {project.location}
                      </span>
                      <span className="font-bold text-[#00a664]">
                        {project.match}% match
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center text-sm text-slate-400 bg-slate-50/50">
              No saved projects yet. Bookmark projects to view them here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}