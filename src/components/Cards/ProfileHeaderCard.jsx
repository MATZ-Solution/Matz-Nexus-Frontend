import React from 'react';

export const ProfileHeaderCard = ({ user }) => {
  // User name se initials generate karne ka logic (e.g., "Jordan Smith" -> "JS")
  const getInitials = (name) => {
    if (!name) return 'JS';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-2xs space-y-6">
      
      {/* 🟢 Top Section: Same TopBar Style Avatar Circle + User Details */}
      <div className="flex items-start gap-5">
        
        {/* 🟢 Exactly same TopBar Avatar Circle */}
        <div className="w-16 h-16 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-xl shrink-0 select-none shadow-xs">
          {getInitials(user?.name)}
        </div>
        
        {/* User Info */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 leading-tight">{user.name}</h2>
          <p className="text-xs font-medium text-slate-500">
            {user.role} · {user.location}
          </p>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            {user.bio}
          </p>
        </div>
      </div>

      {/* 🟢 Inner Divider Line */}
      <hr className="border-slate-100" />

      {/* 🟢 Bottom Metrics / Stats Row */}
      <div className="grid grid-cols-3 gap-6 max-w-2xl pt-1">
        <div>
          <div className="text-2xl md:text-3xl font-bold text-slate-900">{user.stats?.projects ?? 0}</div>
          <div className="text-xs text-slate-400 font-medium mt-1">Projects</div>
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-bold text-slate-900">{user.stats?.collaborations ?? 0}</div>
          <div className="text-xs text-slate-400 font-medium mt-1">Collaborations</div>
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-bold text-slate-900">{user.stats?.views ?? 0}</div>
          <div className="text-xs text-slate-400 font-medium mt-1">Profile views</div>
        </div>
      </div>

    </div>
  );
};

export default ProfileHeaderCard;