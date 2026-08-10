import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ onSelectProject }) => {
  const projects = [
    {
      id: 1,
      category: 'Climate & Energy',
      title: 'OpenGrid Energy',
      description: 'Making renewable energy accessible to every community through an open, intelligent grid.',
      tags: ['Energy', 'Climate', 'Open source'],
      stage: 'Prototype',
      country: 'United Kingdom',
      match: 94
    },
    {
      id: 2,
      category: 'Health & Wellness',
      title: 'MediRoute',
      description: 'A smarter way for remote communities to access preventative healthcare and local support.',
      tags: ['Healthcare', 'Mobile', 'Impact'],
      stage: 'MVP',
      country: 'Kenya',
      match: 88
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onSelectProject && onSelectProject(project)}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;