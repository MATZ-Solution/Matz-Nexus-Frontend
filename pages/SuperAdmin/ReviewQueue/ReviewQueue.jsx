import React, { useState } from 'react';

// ✅ Overview waala same Reusable Header Import
import PageHeader from "../../../src/components/shared/PageHeader.jsx";

const projects = [
  { id: 1, name: 'Aphasia Labs', subtitle: 'HealthTech · Idea', author: 'Rohan Mehta', category: 'Individual', waiting: '2 hours', isUrgent: false, isPrimaryAction: true },
  { id: 2, name: 'Loom Ledger v2', subtitle: 'Fintech · Early Revenue', author: 'Valentina Cruz', category: 'Individual', waiting: '6 hours', isUrgent: false, isPrimaryAction: false },
  { id: 3, name: 'Grid Sense', subtitle: 'CleanTech · Prototype', author: 'Peter Otieno', category: 'Individual', waiting: '1 day', isUrgent: false, isPrimaryAction: false },
  { id: 4, name: 'Coastal Plastics Index', subtitle: 'Environmental · MVP', author: 'Marisol Vega', category: 'Organization', waiting: '3 days', isUrgent: true, isPrimaryAction: false },
  { id: 5, name: 'FarmLink Credit', subtitle: 'Fintech · Idea', author: 'Kwame Asante', category: 'Individual', waiting: '4 days', isUrgent: true, isPrimaryAction: false },
];

export default function ReviewQueue() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-6 md:p-8 space-y-8">
      
      {/* 1. Overview waala Same Reusable Top Header (Search, Bell & Profile Avatar Included) */}
      <PageHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        placeholder="Search users, projects, reports..."
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Heading */}
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          7 projects awaiting review
        </h1>

        {/* Table */}
        <div className="bg-white border border-gray-200/80 rounded-md shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-6">Project</th>
                <th className="py-3 px-6">Submitted By</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Waiting</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {projects.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-400 font-medium mt-0.5">{item.subtitle}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-[#723225] flex items-center justify-center text-white text-xs font-semibold">
                        {item.author.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{item.author}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block bg-[#e8e7e1] text-gray-600 text-xs px-2.5 py-1 rounded font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-semibold text-xs ${item.isUrgent ? 'text-[#b03021]' : 'text-gray-600'}`}>
                      {item.waiting}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      className={`px-4 py-1.5 rounded text-xs font-semibold transition-all ${
                        item.isPrimaryAction
                          ? 'bg-[#923324] text-white hover:bg-[#78281b] shadow-sm'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}