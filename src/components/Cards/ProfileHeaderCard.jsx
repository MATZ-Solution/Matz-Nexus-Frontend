import React from 'react';

export const ProfileHeaderCard = ({ user }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start gap-5">
        {/* Avatar */}
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${user.avatarGradient || 'from-amber-400 via-purple-500 to-indigo-600'} shrink-0 shadow-sm`} />
        
        {/* User Details */}
        <div className="space-y-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{user.name}</h1>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
              {user.role} · {user.location}
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
            {user.bio}
          </p>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {user.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100/80 border border-gray-200/80 text-gray-600 text-xs font-medium rounded-lg font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;