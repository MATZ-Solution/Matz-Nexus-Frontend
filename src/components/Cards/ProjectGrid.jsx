import React, { useState, useEffect } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';
import axios from 'axios';

const ProjectGrid = ({
  onSelectProject,
  onOpen,
  savedProjectIds = [],
  onToggleSave,
  searchQuery = '',
  selectedCategory = 'All projects',
}) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        
        // 🟢 FIX: Handles both direct array [] and { success: true, data: [] } response formats
        const rows = Array.isArray(res.data) ? res.data : (res.data?.data || []);

        // Normalize backend field names -> what the UI expects
        const normalized = rows.map((p) => ({
          ...p,
          match: p.match ?? p.match_score ?? 0,
          country: p.country ?? p.location ?? '',
          tags: Array.isArray(p.tags)
            ? p.tags
            : (() => {
                try {
                  return JSON.parse(p.tags || '[]');
                } catch {
                  return [];
                }
              })(),
        }));

        if (isMounted) setProjects(normalized);
      } catch (err) {
        console.error('Error fetching projects:', err);
        if (isMounted) setError('Could not load projects from server.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelect = (project) => {
    if (onSelectProject) onSelectProject(project);
    if (onOpen) onOpen(project);
  };

  const handleBookmarkClick = (e, project) => {
    e.stopPropagation();
    if (onToggleSave) onToggleSave(project);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All projects' || project.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      (project.title || '').toLowerCase().includes(query) ||
      (project.description || '').toLowerCase().includes(query) ||
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

  if (error) {
    return (
      <div className="border border-dashed border-red-200 rounded-2xl p-12 text-center text-sm text-red-400 bg-red-50/50 w-full flex flex-col items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin opacity-0" />
        {error}
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
              {(project.tags || []).map((tag) => (
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
                {project.stage} · {project.country || project.location}
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