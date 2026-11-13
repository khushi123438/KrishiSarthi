import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Globe, Menu, X, LogIn, ArrowRight, ShieldCheck, User } from 'lucide-react';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout, role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'hi' ? 'en' : 'hi';
    i18n.changeLanguage(newLang);
    localStorage.setItem('krishi_lang', newLang);
  };

  const getDashboardPath = () => {
    if (!isAuthenticated) return '/login';
    if (role === 'FARMER') return '/farmer';
    if (role === 'BUYER') return '/buyer';
    if (role === 'TRANSPORTER') return '/transporter';
    if (role === 'ADMIN') return '/admin';
    return '/';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3F0E5] shadow-subtle transition-all">
      <div className="w-full max-w-none px-6 lg:px-10 xl:px-12 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#104B32] to-[#176B45] flex items-center justify-center text-white shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform border border-emerald-400/30">
            <span className="text-2xl">🌾</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-[#104B32] tracking-tight">
                {t('brand.name')}
              </span>
             
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none font-hindi">
              {t('brand.tagline_hindi')}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-[#104B32] whitespace-nowrap">
          <Link to="/" className="hover:text-[#176B45] transition-colors">{t('nav.home')}</Link>
          <Link to="/marketplace" className="hover:text-[#176B45] transition-colors">{t('nav.marketplace')}</Link>
          <a href="/#how-it-works" className="hover:text-[#176B45] transition-colors">{t('nav.how_it_works')}</a>
          <Link to="/weather" className="hover:text-[#176B45] transition-colors">{t('nav.weather_mandi')}</Link>
          <Link to="/trace" className="hover:text-[#176B45] transition-colors flex items-center gap-1 text-[#176B45]">
            <ShieldCheck className="w-4 h-4" />
            <span>{t('nav.trace_qr')}</span>
          </Link>
          <Link to="/about" className="hover:text-[#176B45] transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" className="hover:text-[#176B45] transition-colors">{t('nav.contact')}</Link>
        </nav>

        {/* Action Controls & Auth */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Hindi / English Switcher */}
          <button
            onClick={toggleLanguage}
            title="Switch Language"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C8E1CC] bg-[#F0F7F0] text-xs font-bold text-[#104B32] hover:bg-[#E3F0E5] transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#176B45]" />
            <span>{t('nav.language')}</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to={getDashboardPath()}
                className="btn-forest text-xs py-2 px-4 shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>{t('nav.dashboard')} ({user?.fullName?.split(' ')[0] || user?.role})</span>
              </Link>
              <button
                onClick={logout}
                className="text-xs text-slate-500 hover:text-red-600 font-bold px-2 py-1 transition-colors"
              >
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn-outline-forest text-xs py-2 px-4"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('nav.login')}</span>
              </Link>
              <Link
                to="/register"
                className="btn-forest text-xs py-2 px-4 shadow-sm"
              >
                <span>{t('nav.get_started')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1 rounded border border-[#C8E1CC] bg-[#F0F7F0] text-[11px] font-bold text-[#104B32]"
          >
            <Globe className="w-3 h-3 text-[#176B45]" />
            <span>{i18n.language === 'hi' ? 'EN' : 'हिन्दी'}</span>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#104B32] hover:bg-[#E3F0E5] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E3F0E5] px-6 py-6 space-y-4 animate-fade-in shadow-xl">
          <nav className="flex flex-col space-y-3 font-bold text-sm text-[#104B32]">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
            <Link to="/marketplace" onClick={() => setMobileMenuOpen(false)}>{t('nav.marketplace')}</Link>
            <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>{t('nav.how_it_works')}</a>
            <Link to="/weather" onClick={() => setMobileMenuOpen(false)}>{t('nav.weather_mandi')}</Link>
            <Link to="/trace" onClick={() => setMobileMenuOpen(false)} className="text-[#176B45] flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('nav.trace_qr')}</span>
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>
          </nav>

          <div className="pt-4 border-t border-[#E3F0E5] flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full btn-forest text-xs py-2.5"
                >
                  <User className="w-4 h-4" />
                  <span>Go to {user?.role} Dashboard</span>
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full text-center text-xs text-red-600 font-bold py-2"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full btn-outline-forest text-xs py-2.5"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full btn-forest text-xs py-2.5"
                >
                  {t('nav.get_started')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
