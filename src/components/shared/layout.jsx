import React from 'react';
import { Outlet } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import Sidebar from './sidebar.jsx';

export default function Layout() {
  return (
    <div className="w-full flex flex-col bg-white font-sans">
      {/* Top Bar */}
      <TopBar currentUserName="Amara Osei" />

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar />

        {/* Dynamic Main Content Area */}
        <main className="flex-1 bg-white p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}