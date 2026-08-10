import React, { useState } from 'react';
import { MoreVertical, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

// Reusable Top Header Component Import
import PageHeader from "../../../src/components/shared/PageHeader.jsx";

const usersList = [
  { id: 1, name: 'Rohan Mehta', email: 'rohan@aphasia.io', role: 'Founder', status: 'Active', projects: 3, joined: '12 Jan 2026' },
  { id: 2, name: 'Valentina Cruz', email: 'valentina@loomledger.com', role: 'Creator', status: 'Active', projects: 2, joined: '04 Feb 2026' },
  { id: 3, name: 'Peter Otieno', email: 'peter@gridsense.tech', role: 'Developer', status: 'Pending Review', projects: 1, joined: '18 Mar 2026' },
  { id: 4, name: 'Marisol Vega', email: 'marisol@coastalplastics.org', role: 'Org Admin', status: 'Active', projects: 5, joined: '22 Nov 2025' },
  { id: 5, name: 'Kwame Asante', email: 'kwame@farmlink.co', role: 'Founder', status: 'Suspended', projects: 1, joined: '01 Aug 2026' },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f5f5f0] p-6 md:p-8 space-y-8">
      
      {/* 1. Overview waala Same Reusable Top Header */}
      <PageHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        placeholder="Search users by name, email, role..."
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Users Management</h1>
            <p className="text-xs text-gray-500 mt-1">Manage user access, roles, and status across Project Nexus.</p>
          </div>
          <button className="px-4 py-2 rounded text-xs font-semibold bg-[#923324] text-white hover:bg-[#78281b] shadow-sm active:scale-95 transition-all">
            + Add New User
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200/80 rounded-md shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-6">User</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Projects</th>
                <th className="py-3 px-6">Joined Date</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#723225] flex items-center justify-center text-white text-xs font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-400 font-medium">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-700">{user.role}</td>
                  <td className="py-4 px-6">
                    {user.status === 'Active' && (
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        <CheckCircle className="w-3 h-3" /> Active
                      </span>
                    )}
                    {user.status === 'Pending Review' && (
                      <span className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                    {user.status === 'Suspended' && (
                      <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        <ShieldAlert className="w-3 h-3" /> Suspended
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-semibold">{user.projects}</td>
                  <td className="py-4 px-6 text-xs text-gray-500">{user.joined}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                      <MoreVertical className="w-4 h-4" />
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