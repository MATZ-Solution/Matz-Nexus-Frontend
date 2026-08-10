import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles,
  Search, 
  FolderKanban, 
  LayoutDashboard, 
  MessageSquare, 
  User, 
  Plus,
  LogIn,
  UserPlus,
  Users,
  Bookmark,
  Bell
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = { name: "Amara Osei", role: "researcher", country: "kenya" };

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
    <aside className="w-64 bg-white text-slate-700 min-h-screen flex flex-col justify-between p-4 select-none border-r border-slate-100 shrink-0 font-sans">
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#0f9f59] flex items-center justify-center text-white shadow-sm shadow-emerald-200">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base leading-none">Project Nexus</span>
            <span className="text-xs text-slate-400 font-normal mt-1">Innovation ecosystem</span>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#e6f4ea] text-[#0f9f59] font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0f9f59]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="w-5 h-5 bg-[#0f9f59] text-white text-[11px] font-medium rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <button 
          onClick={() => navigate('/submit-project')}
          className="w-full mt-5 bg-[#0f9f59] hover:bg-[#0d8a4e] text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Submit a project</span>
        </button>

        {/* Account Shortcuts */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Account Access
          </p>

          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-slate-500" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => navigate('/signup')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#0f9f59] bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-200/60 transition-all cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#0f9f59]" />
            <span>Create Account</span>
          </button>
        </div>
      </div>

      {/* Bottom Profile Badge */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
          <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white text-xs font-bold bg-gradient-to-tr from-emerald-500 to-teal-600">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-slate-900 truncate leading-tight">{user.name}</h4>
            <p className="text-[11px] text-slate-500 capitalize truncate mt-0.5">
              {user.role} · {user.country}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;