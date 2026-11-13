import React, { useState } from 'react';
import { Modal } from './Modal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Phone, User, MapPin, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { authModalOpen, closeAuthModal, authModalTab, setAuthModalTab, login, register, loading } = useAuth();
  const { t } = useLanguage();

  // Login state
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('FARMER');
  const [regLocation, setRegLocation] = useState('');

  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(loginPhone, loginPassword);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register({
        fullName: regFullName,
        phoneNumber: regPhone,
        email: regEmail,
        password: regPassword,
        role: regRole,
        address: regLocation,
        city: regLocation,
        state: 'Uttar Pradesh',
      });
      setSuccessMsg('Registration successful! Logged in.');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    }
  };

  // Quick Demo Login helper
  const handleDemoLogin = (phone, pass) => {
    setLoginPhone(phone);
    setLoginPassword(pass);
    login(phone, pass).catch((err) => setError(err.message));
  };

  return (
    <Modal
      isOpen={authModalOpen}
      onClose={closeAuthModal}
      title={authModalTab === 'login' ? 'Welcome to KrishiSarthi' : 'Create Your Account'}
    >
      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-5">
        <button
          onClick={() => { setAuthModalTab('login'); setError(null); }}
          className={`flex-1 py-2.5 font-bold text-sm text-center border-b-2 transition-colors ${
            authModalTab === 'login'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => { setAuthModalTab('register'); setError(null); }}
          className={`flex-1 py-2.5 font-bold text-sm text-center border-b-2 transition-colors ${
            authModalTab === 'register'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Error / Success Alerts */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-emerald-700">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Login Form */}
      {authModalTab === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Phone Number or Username / Email
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                placeholder="e.g. 9876543210 or admin@farmlink.in"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-2.5 text-sm font-bold shadow-md"
          >
            {loading ? 'Authenticating...' : 'Sign In to KrishiSarthi'}
          </button>

          {/* Quick Demo Logins for Fast Review */}
          <div className="pt-3 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-500 mb-2 text-center uppercase tracking-wider">
              Quick Demo Logins (Seed Accounts)
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoLogin('9876543210', 'password123')}
                className="p-2 border border-emerald-200 bg-emerald-50 text-emerald-800 rounded-lg font-semibold hover:bg-emerald-100 transition-colors text-left"
              >
                🌾 Farmer (Ramesh)
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('9876543212', 'password123')}
                className="p-2 border border-blue-200 bg-blue-50 text-blue-800 rounded-lg font-semibold hover:bg-blue-100 transition-colors text-left"
              >
                🏢 Buyer (Rajiv)
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('9876543213', 'password123')}
                className="p-2 border border-amber-200 bg-amber-50 text-amber-800 rounded-lg font-semibold hover:bg-amber-100 transition-colors text-left"
              >
                🚚 Transporter (Gurdeep)
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin@farmlink.in', 'Admin@12345')}
                className="p-2 border border-purple-200 bg-purple-50 text-purple-800 rounded-lg font-semibold hover:bg-purple-100 transition-colors text-left"
              >
                ⚡ Platform Admin
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Registration Form */
        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'FARMER', label: 'Farmer', emoji: '🌾' },
                { key: 'BUYER', label: 'Buyer', emoji: '🏢' },
                { key: 'TRANSPORTER', label: 'Transporter', emoji: '🚚' },
              ].map((r) => (
                <button
                  type="button"
                  key={r.key}
                  onClick={() => setRegRole(r.key)}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition-all ${
                    regRole === r.key
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-base mb-0.5">{r.emoji}</div>
                  <div>{r.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (10 digits)</label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">City / Village & District</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={regLocation}
                onChange={(e) => setRegLocation(e.target.value)}
                placeholder="e.g. Karnal, Haryana"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-2.5 text-sm font-bold shadow-md mt-2"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>
      )}
    </Modal>
  );
};
