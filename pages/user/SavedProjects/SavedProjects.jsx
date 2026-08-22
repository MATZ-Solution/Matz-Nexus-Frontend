import React, { useState, useEffect } from 'react';
import { Bookmark, Loader2 } from 'lucide-react';
import axios from 'axios';
import ProjectDetailCard from '../../../src/components/shared/ProjectDetailCard';

export default function SavedProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [savedProjectIds, setSavedProjectIds] = useState(() => {
    const saved = localStorage.getItem('nexus_saved_projects');
    return saved ? JSON.parse(saved) : [1];
  });

  useEffect(() => {
    localStorage.setItem('nexus_saved_projects', JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  // NEW: fetch real projects from backend instead of using the hardcoded
  // allSampleProjects array. Without this, saved projects that were
  // published dynamically (with DB-generated ids) could never be found,
  // since they don't exist in the old static array.
  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        const rows = res.data?.data || [];

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

        if (isMounted) setAllProjects(normalized);
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

  const handleToggleSave = (projectOrId) => {
    const id = typeof projectOrId === 'object' ? projectOrId.id : projectOrId;
    setSavedProjectIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const savedProjects = allProjects.filter((p) => savedProjectIds.includes(p.id));

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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-100 bg-white p-6 h-56 animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <div className="border border-dashed border-red-200 rounded-2xl p-12 text-center text-sm text-red-400 bg-red-50/50 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin opacity-0" />
              {error}
            </div>
          ) : savedProjects.length > 0 ? (
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
                          e.stopPropagation();
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
                      {(project.tags || []).map((tag, i) => (
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
                        {project.stage} · {project.country || project.location}
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
