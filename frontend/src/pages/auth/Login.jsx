import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Lock, Phone, User, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const { t } = useTranslation();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login(loginPhone, loginPassword);
      if (res?.role === 'FARMER') navigate('/farmer');
      else if (res?.role === 'BUYER') navigate('/buyer');
      else if (res?.role === 'TRANSPORTER') navigate('/transporter');
      else if (res?.role === 'ADMIN') navigate('/admin');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid phone or password. Please verify your credentials.');
    }
  };

  const handleDemoLogin = (phone, pass, targetRoute) => {
    setLoginPhone(phone);
    setLoginPassword(pass);
    login(phone, pass)
      .then(() => navigate(targetRoute))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E3F0E5] shadow-card p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E3F0E5] text-[#176B45] text-2xl mb-2">
            🌾
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#104B32]">
            {t('auth.login_title')}
          </h1>
          <p className="text-xs text-slate-500">
            {t('auth.login_desc')}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t('auth.phone_email')} *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                placeholder="e.g. 9876543210 or admin@farmlink.in"
                className="w-full pl-10 pr-3 py-2.5 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                {t('auth.password')} *
              </label>
              <Link to="/forgot-password" className="text-[11px] font-bold text-[#176B45] hover:underline">
                {t('auth.forgot_pass')}
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter account password"
                className="w-full pl-10 pr-3 py-2.5 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-forest py-3 text-xs font-bold shadow-md cursor-pointer"
          >
            {loading ? 'Authenticating...' : t('auth.btn_login')}
          </button>
        </form>

        {/* Quick Demo Logins (1-Click) */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 mb-2.5 text-center uppercase tracking-wider">
            {t('auth.quick_demo')}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoLogin('9876543210', 'password123', '/farmer')}
              className="p-2 border border-[#C8E1CC] bg-[#F0F7F0] text-[#104B32] rounded-xl font-bold hover:bg-[#E3F0E5] transition-colors text-left"
            >
              🌾 Farmer (Ramesh)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('9876543212', 'password123', '/buyer')}
              className="p-2 border border-blue-200 bg-blue-50 text-blue-900 rounded-xl font-bold hover:bg-blue-100 transition-colors text-left"
            >
              🏢 Buyer (Rajiv)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('9876543213', 'password123', '/transporter')}
              className="p-2 border border-amber-200 bg-amber-50 text-amber-900 rounded-xl font-bold hover:bg-amber-100 transition-colors text-left"
            >
              🚚 Driver (Gurdeep)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin@farmlink.in', 'Admin@12345', '/admin')}
              className="p-2 border border-purple-200 bg-purple-50 text-purple-900 rounded-xl font-bold hover:bg-purple-100 transition-colors text-left"
            >
              ⚡ Platform Admin
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            {t('auth.dont_have_acc')}{' '}
            <Link to="/register" className="font-bold text-[#176B45] hover:underline">
              {t('nav.get_started')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
