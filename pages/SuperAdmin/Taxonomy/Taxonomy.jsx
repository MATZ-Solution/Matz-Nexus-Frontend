import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

// Reusable Top Header Component Import
import PageHeader from "../../../src/components/shared/PageHeader.jsx";

export default function Taxonomy() {
  const [searchQuery, setSearchQuery] = useState('');

  const [industries, setIndustries] = useState([
    'CleanTech',
    'HealthTech',
    'Fintech',
    'AI / Accessibility',
    'Materials Science',
    'Environmental',
  ]);

  const projectStages = [
    'Idea',
    'Research',
    'Prototype',
    'MVP',
    'Early Revenue',
    'Scaling',
    'Established Business',
  ];

  const [tags, setTags] = useState([
    'IoT',
    'Embedded',
    'Computer Vision',
    'Blockchain',
    'Biomaterials',
  ]);

  const [newIndustry, setNewIndustry] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showIndustryInput, setShowIndustryInput] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);

  const handleAddIndustry = () => {
    if (newIndustry.trim()) {
      setIndustries([...industries, newIndustry.trim()]);
      setNewIndustry('');
      setShowIndustryInput(false);
    }
  };

  const handleRemoveIndustry = (index) => {
    setIndustries(industries.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-6 md:p-8 space-y-8">
      
      {/* 1. Reusable Top Header */}
      <PageHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        placeholder="Search users, projects, reports..."
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Main Title */}
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Platform categories
        </h1>

        <div className="space-y-8 max-w-5xl">
          {/* Industries Section */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-800">Industries</h2>
            <div className="flex flex-wrap items-center gap-2">
              {industries.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 shadow-xs"
                >
                  {item}
                  <button
                    onClick={() => handleRemoveIndustry(index)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {showIndustryInput ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddIndustry()}
                    placeholder="Industry name"
                    className="px-3 py-1 rounded-full border border-gray-300 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                    autoFocus
                  />
                  <button
                    onClick={handleAddIndustry}
                    className="text-xs px-2.5 py-1 bg-[#923324] text-white rounded-full font-medium active:scale-95 transition-all"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowIndustryInput(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-50 border border-dashed border-gray-300 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Industry
                </button>
              )}
            </div>
          </div>

          {/* Project Stages Section (Fixed) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-gray-800">Project stages</h2>
              <span className="text-xs text-gray-400 font-normal">
                – fixed, core to platform
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {projectStages.map((stage, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-white/60 border border-gray-200 text-xs font-medium text-gray-400 cursor-not-allowed"
                >
                  {stage}
                </span>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-800">Tags</h2>
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-700 shadow-xs"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(index)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {showTagInput ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Tag name"
                    className="px-3 py-1 rounded-full border border-gray-300 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
                    autoFocus
                  />
                  <button
                    onClick={handleAddTag}
                    className="text-xs px-2.5 py-1 bg-[#923324] text-white rounded-full font-medium active:scale-95 transition-all"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowTagInput(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-50 border border-dashed border-gray-300 text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add tag
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}