  import React from 'react';

  export const SearchBar = ({ 
    placeholder = "Search projects, skills, people...", 
    value, 
    onChange,
    className = "" 
  }) => {
    return (
      <div className={`relative w-full max-w-md ${className}`}>
        {/* Search Icon (SVG - No lucide-react required) */}
        <svg 
          className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white border border-gray-200/80 rounded-xl pl-10 pr-4 py-2.5 text-xs md:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
        />
      </div>
    );
  };

  export default SearchBar;