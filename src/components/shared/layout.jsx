import React from 'react';
import { Outlet } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import Sidebar from './sidebar.jsx';

export default function Layout() {
  return (
    <div className="h-screen w-full flex flex-col bg-white font-sans overflow-hidden">
      {/* Top Bar */}
      <TopBar currentUserName="Amara Osei" />

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar />

        {/* Dynamic Main Content Area */}
        <main className=" overflow-y-auto bg-white p-8 relative ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}