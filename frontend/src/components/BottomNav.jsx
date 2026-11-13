import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Sprout, Truck, QrCode, CloudSun, UserCheck, Inbox } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const BottomNav = () => {
  const { role, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const navItemClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-2 text-[11px] font-semibold transition-colors ${
      isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
    }`;

  // Role-specific bottom bars
  if (role === 'FARMER') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden flex items-center justify-around shadow-lg">
        <NavLink to="/farmer" end className={navItemClass}>
          <Home className="w-5 h-5 mb-0.5" />
          <span>{t('nav_home')}</span>
        </NavLink>
        <NavLink to="/farmer/crops" className={navItemClass}>
          <Sprout className="w-5 h-5 mb-0.5" />
          <span>{t('nav_crops')}</span>
        </NavLink>
        <NavLink to="/farmer/offers" className={navItemClass}>
          <Inbox className="w-5 h-5 mb-0.5" />
          <span>Offers</span>
        </NavLink>
        <NavLink to="/weather" className={navItemClass}>
          <CloudSun className="w-5 h-5 mb-0.5" />
          <span>Mandi</span>
        </NavLink>
        <NavLink to="/trace" className={navItemClass}>
          <QrCode className="w-5 h-5 mb-0.5" />
          <span>Trace</span>
        </NavLink>
      </div>
    );
  }

  if (role === 'BUYER') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden flex items-center justify-around shadow-lg">
        <NavLink to="/buyer/market" className={navItemClass}>
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span>Market</span>
        </NavLink>
        <NavLink to="/buyer/orders" className={navItemClass}>
          <Inbox className="w-5 h-5 mb-0.5" />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/weather" className={navItemClass}>
          <CloudSun className="w-5 h-5 mb-0.5" />
          <span>Mandi</span>
        </NavLink>
        <NavLink to="/trace" className={navItemClass}>
          <QrCode className="w-5 h-5 mb-0.5" />
          <span>Trace</span>
        </NavLink>
      </div>
    );
  }

  if (role === 'TRANSPORTER') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden flex items-center justify-around shadow-lg">
        <NavLink to="/transporter/loads" className={navItemClass}>
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span>Loads</span>
        </NavLink>
        <NavLink to="/transporter/shipments" className={navItemClass}>
          <Truck className="w-5 h-5 mb-0.5" />
          <span>Trips</span>
        </NavLink>
        <NavLink to="/weather" className={navItemClass}>
          <CloudSun className="w-5 h-5 mb-0.5" />
          <span>Weather</span>
        </NavLink>
        <NavLink to="/trace" className={navItemClass}>
          <QrCode className="w-5 h-5 mb-0.5" />
          <span>Trace</span>
        </NavLink>
      </div>
    );
  }

  if (role === 'ADMIN') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden flex items-center justify-around shadow-lg">
        <NavLink to="/admin" className={navItemClass}>
          <UserCheck className="w-5 h-5 mb-0.5" />
          <span>Admin</span>
        </NavLink>
        <NavLink to="/buyer/market" className={navItemClass}>
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span>Market</span>
        </NavLink>
        <NavLink to="/trace" className={navItemClass}>
          <QrCode className="w-5 h-5 mb-0.5" />
          <span>Trace</span>
        </NavLink>
      </div>
    );
  }

  // Default Guest Navigation
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden flex items-center justify-around shadow-lg">
      <NavLink to="/" end className={navItemClass}>
        <Home className="w-5 h-5 mb-0.5" />
        <span>{t('nav_home')}</span>
      </NavLink>
      <NavLink to="/buyer/market" className={navItemClass}>
        <ShoppingBag className="w-5 h-5 mb-0.5" />
        <span>Market</span>
      </NavLink>
      <NavLink to="/weather" className={navItemClass}>
        <CloudSun className="w-5 h-5 mb-0.5" />
        <span>Mandi</span>
      </NavLink>
      <NavLink to="/trace" className={navItemClass}>
        <QrCode className="w-5 h-5 mb-0.5" />
        <span>Trace</span>
      </NavLink>
    </div>
  );
};
