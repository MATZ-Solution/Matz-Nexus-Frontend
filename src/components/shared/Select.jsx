import React from 'react';

export default function Select({ label, options = [], error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      >
        <option value="" disabled>
          {props.placeholder || 'Select an option'}
        </option>
        {options.map((option, index) => {
          const value = typeof option === 'object' ? option.value : option;
          const label = typeof option === 'object' ? option.label : option;
          return (
            <option key={index} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}