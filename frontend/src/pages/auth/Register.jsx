import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, Mail, Lock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Register = () => {
  const { t } = useTranslation();
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('FARMER');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Haryana');
  const [farmSizeAcres, setFarmSizeAcres] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      fullName,
      phoneNumber,
      email: email || undefined,
      password,
      role,
      city,
      state,
      address: city,
      farmSizeAcres: role === 'FARMER' && farmSizeAcres ? parseFloat(farmSizeAcres) : undefined,
      businessName: role === 'BUYER' ? businessName : undefined,
      vehicleNumber: role === 'TRANSPORTER' ? vehicleNumber : undefined,
    };

    try {
      const res = await register(payload);
      if (res?.role === 'FARMER') navigate('/farmer');
      else if (res?.role === 'BUYER') navigate('/buyer');
      else if (res?.role === 'TRANSPORTER') navigate('/transporter');
      else navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#E3F0E5] shadow-card p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E3F0E5] text-[#176B45] text-2xl mb-2">
            🌱
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#104B32]">
            {t('auth.register_title')}
          </h1>
          <p className="text-xs text-slate-500">
            {t('auth.register_desc')}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t('auth.role_select')} *
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
                  onClick={() => setRole(r.key)}
                  className={`py-2.5 px-1 rounded-xl border text-center transition-all ${
                    role === r.key
                      ? 'border-[#176B45] bg-[#E3F0E5] text-[#104B32] font-black ring-2 ring-[#176B45]/20'
                      : 'border-[#C8E1CC] bg-[#F0F7F0] text-slate-600 font-bold hover:bg-[#E3F0E5]/50'
                  }`}
                >
                  <div className="text-xl mb-0.5">{r.emoji}</div>
                  <div className="text-xs">{r.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('auth.full_name')} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-9 pr-3 py-2 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number (10 digits) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-9 pr-3 py-2 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                />
              </div>
            </div>
          </div>

          {/* Email (Optional) & Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ramesh@gmail.com"
                  className="w-full pl-9 pr-3 py-2 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('auth.password')} *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full pl-9 pr-3 py-2 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                />
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                City / Village / Tehsil *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Karnal"
                  className="w-full pl-9 pr-3 py-2 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full py-2 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
              >
                <option value="Haryana">Haryana</option>
                <option value="Punjab">Punjab</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>
          </div>

          {/* Role-Specific fields */}
          {role === 'FARMER' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Farm Size in Acres (Optional)
              </label>
              <input
                type="number"
                step="any"
                value={farmSizeAcres}
                onChange={(e) => setFarmSizeAcres(e.target.value)}
                placeholder="e.g. 5.5"
                className="w-full py-2 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800"
              />
            </div>
          )}

          {role === 'BUYER' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Business / Mill Name (Optional)
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Malhotra Agro Processing Ltd."
                className="w-full py-2 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800"
              />
            </div>
          )}

          {role === 'TRANSPORTER' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Vehicle Registration Number (Optional)
              </label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. HR-05-AB-1234"
                className="w-full py-2 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-forest py-3 text-xs font-bold shadow-md cursor-pointer mt-2"
          >
            {loading ? 'Creating Account...' : t('auth.btn_register')}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            {t('auth.already_have_acc')}{' '}
            <Link to="/login" className="font-bold text-[#176B45] hover:underline">
              {t('nav.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
