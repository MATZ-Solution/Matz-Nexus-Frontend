import React from 'react';
import { Outlet } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import Sidebar from './sidebar.jsx';

export default function Layout() {
  return (
    <div className="w-full flex bg-white font-sans min-h-screen">
      {/* Sidebar - full height, left side */}
      <Sidebar />

      {/* Right column: TopBar + Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar currentUserName="Amara Osei" />

        <main className="flex-1 bg-white p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}