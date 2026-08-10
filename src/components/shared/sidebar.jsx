import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Search,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  User,
  Users,
  Bookmark,
  Bell,
  Lock
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = { name: "Jordan Smith" };

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/' },
    { name: 'Discover', icon: Search, path: '/discover' },
    { name: 'My Projects', icon: FolderKanban, path: '/my-projects' },
    { name: 'Saved Projects', icon: Bookmark, path: '/saved-projects' },
    { name: 'Collaboration Requests', icon: Users, path: '/requests', badge: 2 },
    { name: 'Messages', icon: MessageSquare, path: '/messages', badge: 3 },
    { name: 'Notifications', icon: Bell, path: '/notifications', badge: 4 },
    { name: 'Profile Overview', icon: User, path: '/profile' },
  ];

  return (
    <aside className="w-60 bg-white text-slate-700 min-h-screen flex flex-col justify-between p-4 select-none border-r border-slate-100 shrink-0 font-sans">
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 px-2 py-4 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#0f9f59] flex items-center justify-center text-white shadow-sm shadow-emerald-200">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-sm leading-none">Project Nexus</span>
            <span className="text-xs text-slate-400 font-normal mt-1">Innovation ecosystem</span>
          </div>
        </div>

        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => navigate(item.path)}
                className={`w-full flex items-start justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#e6f4ea] text-[#0f9f59] font-semibold'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <Icon className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${isActive ? 'text-[#0f9f59]' : 'text-slate-400'}`} />
                  <span className="text-left break-words">{item.name}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="w-5 h-5 shrink-0 bg-[#0f9f59] text-white text-[11px] font-medium rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => navigate('/admin/overview')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer"
          >
            <Lock className="w-4.5 h-4.5 text-slate-400" />
            <span>Admin console</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;