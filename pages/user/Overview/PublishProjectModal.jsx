import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';

// ==========================================
// 1. FILTER DROPDOWN COMPONENT (Sized like Input)
// ==========================================
const FilterDropdown = ({ label, options = [], selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button - Same height/padding (py-3) & rounded-xl as Input fields */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 flex items-center justify-between focus:outline-none focus:border-[#0f9f59] cursor-pointer transition-all"
      >
        <span className={selectedValue ? 'text-slate-800' : 'text-slate-400'}>
          {selectedValue || label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Options List */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 w-full bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 max-h-52 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-slate-50 ${
                  selectedValue === option
                    ? 'text-[#0f9f59] font-semibold bg-emerald-50/50'
                    : 'text-slate-700'
                }`}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-xs text-slate-400">No options</div>
          )}

          {selectedValue && (
            <button
              type="button"
              onClick={() => {
                onSelect('');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-[11px] text-red-500 hover:bg-red-50 border-t border-slate-100 font-medium mt-1 transition-colors"
            >
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. PUBLISH PROJECT MODAL COMPONENT
// ==========================================
const industryOptions = [
  'Climate & Energy',
  'Health & Wellness',
  'Education',
  'Fintech',
  'Agriculture',
  'Creative Technology',
];

const stageOptions = [
  'Idea',
  'Prototype',
  'MVP',
  'Early Revenue',
  'Growth',
];

const PublishProjectModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: '',
    stage: '',
    country: '',
    lookingFor: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Submitted:', formData);
    setFormData({
      title: '',
      description: '',
      industry: '',
      stage: '',
      country: '',
      lookingFor: '',
    });
    onClose();
  };

  return createPortal(
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        backdropFilter: 'blur(4px)',
        zIndex: 999999 
      }}
      className="flex items-center justify-center p-4"
    >
      {/* Background Overlay Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div 
        onClick={(e) => e.stopPropagation()} 
       className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[95vh] flex flex-col z-10"
      >
        <div className="px-8 pt-6 pb-3 flex items-center justify-between border-b border-slate-100 bg-white">
          <h2 className="text-xl font-bold text-slate-800">Publish a project</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6 flex-1">
          <div className="flex items-start">
            <div>
              <span className="text-[11px] font-bold text-[#0f9f59] uppercase tracking-wider block">
                PUBLISH A PROJECT
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Give your idea a place to grow.
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Start with the essentials. You can enrich your project as it evolves.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Project title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. OpenGrid Energy"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0f9f59]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Short description
              </label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What are you building and why does it matter?"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0f9f59] resize-none"
                required
              />
            </div>

            {/* Industry & Project stage using FilterDropdown with exact input sizing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Industry
                </label>
                <FilterDropdown
                  label="Select industry"
                  options={industryOptions}
                  selectedValue={formData.industry}
                  onSelect={(val) => handleDropdownSelect('industry', val)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Project stage
                </label>
                <FilterDropdown
                  label="Select stage"
                  options={stageOptions}
                  selectedValue={formData.stage}
                  onSelect={(val) => handleDropdownSelect('stage', val)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Where is this based?"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0f9f59]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Looking for
                </label>
                <input
                  type="text"
                  name="lookingFor"
                  value={formData.lookingFor}
                  onChange={handleChange}
                  placeholder="Design, funding, research"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0f9f59]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-slate-600 hover:text-slate-800 px-4 py-2.5 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ backgroundColor: '#0f9f59' }}
                className="text-xs font-semibold text-white px-5 py-2.5 rounded-xl hover:opacity-90 shadow-sm cursor-pointer"
              >
                Publish project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PublishProjectModal;