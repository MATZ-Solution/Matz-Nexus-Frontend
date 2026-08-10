import React from 'react';

const statusStyles = {
  published: { label: 'Published', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  pending: { label: 'Pending', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
  pending_review: { label: 'Pending Review', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  draft: { label: 'Draft', badgeClass: 'bg-slate-100 text-slate-600 border-slate-200' },
  changes_requested: { label: 'Changes Requested', badgeClass: 'bg-orange-50 text-orange-700 border-orange-200' },
  rejected: { label: 'Rejected', badgeClass: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export const ProjectCard = ({
  id,
  title,
  description,
  status = 'draft',
  tags = [],
  updatedAt,
  onCardClick,
}) => {
  const currentStatus = statusStyles[status] || statusStyles.draft;

  return (
    <div
      onClick={() => onCardClick && onCardClick(id)}
      className="group flex flex-col justify-between h-auto min-h-[160px] bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentStatus.badgeClass}`}>
          {currentStatus.label}
        </span>
      </div>

      {description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow break-words">
          {description}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 text-xs text-gray-500 mt-auto">
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium">
                #{tag}
              </span>
            ))}
          </div>
        ) : <div />}

        {updatedAt && <span className="text-gray-400">Updated {updatedAt}</span>}
      </div>
    </div>
  );
};

// Default Export added for safety
export default ProjectCard;