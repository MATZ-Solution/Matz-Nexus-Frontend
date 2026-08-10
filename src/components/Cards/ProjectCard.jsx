import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[220px] cursor-pointer"
    >
      <div>
        {/* Top Tag & Bookmark Button */}
        <div className="flex items-center justify-between mb-3">
          <span className="bg-[#e6f4ea] text-[#0f9f59] text-[11px] font-semibold px-3 py-1 rounded-full">
            {project.category || project.industry}
          </span>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            className="text-slate-300 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-slate-800 text-slate-800' : ''}`} />
          </button>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-4 mt-2 text-xs font-medium border-t border-slate-50">
        <span className="text-slate-400">
          {project.stage} · {project.country || project.location}
        </span>
        {project.match && (
          <span className="text-[#0f9f59] font-bold">
            {project.match}% match
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;