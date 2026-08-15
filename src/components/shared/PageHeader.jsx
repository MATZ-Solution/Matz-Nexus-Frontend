import React from 'react';

export const PageHeading = ({
  title,
  tag = "PROJECT NEXUS",
  subtitle = "Your workspace for building meaningful things.",
  action = null, // Extra buttons ke liye (e.g., "Publish project")
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Title & Subtitle Block */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold text-[#00a664] tracking-wider uppercase">
          {tag}
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-400 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Side Action (Optional) */}
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

export default PageHeading;