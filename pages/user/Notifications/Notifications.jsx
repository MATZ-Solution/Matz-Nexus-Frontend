import React from 'react';
// import NotificationItem from '../../../components/shared/NotificationItem';
// Agar components folder "src" ke andar hai:
import NotificationItem from '/src/components/shared/NotificationItem';
const notificationData = [
  { id: 1, message: 'Your project matched with 8 new collaborators' },
  { id: 2, message: 'Avery Chen accepted your collaboration request' },
  { id: 3, message: 'New project launched in Climate & Energy' },
  { id: 4, message: 'Your profile was viewed 12 times this week' },
];

const Notifications = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans pb-10">
      <div>
        <span className="text-[11px] font-bold text-[#0f9f59] uppercase tracking-wider">
          PROJECT NEXUS
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          Notifications
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Your workspace for building meaningful things.
        </p>
      </div>

      <h2 className="text-sm font-bold text-slate-900 pt-2">
        Notifications
      </h2>

      <div className="space-y-3">
        {notificationData.map((item) => (
          <NotificationItem 
            key={item.id} 
            message={item.message} 
            onClick={() => console.log(`Notification clicked: ${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;