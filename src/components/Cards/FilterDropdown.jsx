import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterDropdown = ({ label = 'All projects', options = [], selectedValue, onSelect }) => {
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

  const current = selectedValue || label;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`w-full pl-4 pr-2 py-2.5 bg-white rounded-xl text-xs flex items-center justify-between gap-2 transition-all cursor-pointer border ${
          isOpen
            ? 'border-[#0f9f59] ring-2 ring-[#0f9f59]/25'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className="truncate text-slate-800">{current}</span>
        <span className="flex items-center justify-center w-7 h-7 rounded-lg border border-slate-200 bg-white shrink-0">
          <ChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#0f9f59]' : ''
            }`}
          />
        </span>
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 max-h-60 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option) => {
              const active = current === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                    active
                      ? 'bg-[#2563eb] text-white font-medium'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-2 text-xs text-slate-400">No options</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
