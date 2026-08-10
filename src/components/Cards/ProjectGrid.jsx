// src/components/Cards/ProjectGrid.jsx
import React from 'react';
import { Bookmark } from 'lucide-react';

const sampleProjects = [
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

const ProjectGrid = ({ projects = sampleProjects, isLoading = false, onSelectProject, onOpen }) => {
  const handleSelect = (project) => {
    if (onSelectProject) onSelectProject(project);
    if (onOpen) onOpen(project);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/60 bg-white p-6 h-64 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((project) => (
        <button
          key={project.id}
          type="button"
          onClick={() => handleSelect(project)}
          className="text-left rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
        >
          <div className="flex items-start justify-between mb-4">
            <span
              style={{ backgroundColor: '#e6f4ea', color: '#0f9f59' }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              {project.category}
            </span>
            <Bookmark className="w-4 h-4 text-slate-300 hover:text-slate-500" />
          </div>

          <h4 className="text-lg font-bold text-slate-900 mb-2">{project.title}</h4>
          <p className="text-sm text-slate-500 leading-relaxed flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <span className="text-sm text-slate-400">
              {project.stage} · {project.location}
            </span>
            <span style={{ color: '#0f9f59' }} className="text-sm font-bold">
              {project.match}% match
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProjectGrid;