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

const ProjectGrid = ({
  projects = sampleProjects,
  isLoading = false,
  onSelectProject,
  onOpen,
  savedProjectIds = [],
  onToggleSave,
  searchQuery = '',        // NEW: text typed into the search box
  selectedCategory = 'All projects', // NEW: value from FilterDropdown
}) => {

  const handleSelect = (project) => {
    if (onSelectProject) onSelectProject(project);
    if (onOpen) onOpen(project);
  };

  const handleBookmarkClick = (e, project) => {
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave(project);
    }
  };

  // FIX: this is the actual filtering logic that was completely missing.
  // Without this, the search box and the "All projects" dropdown had no
  // effect at all — every project always rendered regardless of input.
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All projects' || project.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      (project.tags || []).some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/60 bg-white p-6 h-64 animate-pulse min-w-0"
          />
        ))}
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center text-sm text-slate-400 bg-slate-50/50 w-full">
        No projects match your search or filter.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {filteredProjects.map((project) => {
        const isSaved = savedProjectIds.includes(project.id);

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => handleSelect(project)}
            className="text-left rounded-2xl border border-slate-200/60 bg-white p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group min-w-0 w-full"
          >
            <div className="flex items-start justify-between mb-4 w-full">
              <span
                style={{ backgroundColor: '#e6f4ea', color: '#0f9f59' }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {project.category}
              </span>

              <div
                role="button"
                tabIndex={0}
                onClick={(e) => handleBookmarkClick(e, project)}
                onKeyDown={(e) => e.key === 'Enter' && handleBookmarkClick(e, project)}
                className="p-1.5 -mr-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
                title={isSaved ? 'Remove from saved' : 'Save project'}
              >
                <Bookmark
                  className={`w-4 h-4 transition-all ${
                    isSaved
                      ? 'text-[#0f9f59] fill-[#0f9f59]'
                      : 'text-slate-300 group-hover:text-slate-400'
                  }`}
                />
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 mb-2 break-words">{project.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed flex-1 break-words">
              {project.description}
            </p>

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

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 gap-2">
              <span className="text-sm text-slate-400 truncate">
                {project.stage} · {project.location}
              </span>
              <span style={{ color: '#0f9f59' }} className="text-sm font-bold shrink-0">
                {project.match}% match
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ProjectGrid;
