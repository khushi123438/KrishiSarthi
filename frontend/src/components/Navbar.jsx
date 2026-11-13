import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Globe, LogIn, LogOut, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout, openAuthModal, role } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { unreadCount, setIsDrawerOpen } = useNotifications();
  const navigate = useNavigate();

  const getRoleBadge = (userRole) => {
    switch (userRole) {
      case 'FARMER':
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold">🌾 {t('role_farmer')}</span>;
      case 'BUYER':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-semibold">🏢 {t('role_buyer')}</span>;
      case 'TRANSPORTER':
        return <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-semibold">🚚 {t('role_transporter')}</span>;
      case 'ADMIN':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-semibold">⚡ {t('role_admin')}</span>;
      default:
        return null;
    }
  };

  const getHomeLink = () => {
    if (!isAuthenticated) return '/';
    if (role === 'FARMER') return '/farmer';
    if (role === 'BUYER') return '/buyer/market';
    if (role === 'TRANSPORTER') return '/transporter/loads';
    if (role === 'ADMIN') return '/admin';
    return '/';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to={getHomeLink()} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <span className="text-xl">🌾</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-emerald-800 tracking-tight font-sans">FARMLINK</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">PRO</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none">KrishiSarthi Agricultural Grid</p>
          </div>
        </Link>

        {/* Quick Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link to="/buyer/market" className="hover:text-emerald-700 transition-colors">Marketplace</Link>
          <Link to="/weather" className="hover:text-emerald-700 transition-colors">Mandi & Weather</Link>
          <Link to="/trace" className="hover:text-emerald-700 transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Traceability QR</span>
          </Link>
          {role === 'ADMIN' && (
            <Link to="/admin" className="text-purple-700 hover:text-purple-900 transition-colors font-bold">
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            title="Toggle Language"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Notifications Button */}
          {isAuthenticated && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          )}

          {/* User Account / Auth */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-1">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {user?.fullName || user?.username}
                </span>
                {getRoleBadge(role)}
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="btn-primary text-xs py-2 px-3.5 shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('login_btn')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
