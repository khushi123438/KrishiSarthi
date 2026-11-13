import React from 'react';
import { X, Bell, CheckCircle, Clock } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export const NotificationDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen, notifications, markAsRead } = useNotifications();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={() => setIsDrawerOpen(false)} />

      {/* Drawer */}
      <div className="relative z-10 w-full sm:w-96 bg-white h-full shadow-2xl flex flex-col animate-slide-up sm:animate-none">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-sm">Notifications & Alerts</h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Bell className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No notifications yet.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => !n.isRead && markAsRead(n.id)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  n.isRead
                    ? 'bg-white border-slate-200 text-slate-600'
                    : 'bg-emerald-50/60 border-emerald-200 text-slate-800 font-semibold shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800">{n.title}</span>
                  {!n.isRead && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed mb-2">{n.message}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </span>
                  <span>{n.channel || 'IN_APP'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
