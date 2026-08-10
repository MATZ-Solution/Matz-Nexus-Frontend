import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

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
      {/* Trigger Button - Exact match with form inputs */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-white border rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
          selectedValue
            ? 'border-[#0f9f59] text-slate-900 font-medium'
            : 'border-slate-200 text-slate-400 hover:border-slate-300'
        }`}
      >
        <span className={selectedValue ? 'text-slate-800' : 'text-slate-400'}>
          {selectedValue || label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0f9f59]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 w-full bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 max-h-52 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-emerald-50/50 ${
                  selectedValue === option
                    ? 'text-[#0f9f59] font-semibold bg-emerald-50/60'
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

export default FilterDropdown;