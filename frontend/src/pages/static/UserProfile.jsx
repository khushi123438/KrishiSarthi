import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const UserProfile = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [city, setCity] = useState(user?.city || 'Karnal');
  const [state, setState] = useState(user?.state || 'Haryana');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <div className="card-krishi p-6 bg-white border border-[#E3F0E5] space-y-4">
        <div className="flex items-center gap-4 border-b border-[#E3F0E5] pb-5">
          <div className="w-16 h-16 rounded-2xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center text-3xl font-bold">
            {user?.role === 'FARMER' ? '🌾' : user?.role === 'BUYER' ? '🏢' : user?.role === 'TRANSPORTER' ? '🚚' : '⚡'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-[#104B32]">{user?.fullName || user?.username}</h1>
              <span className="text-xs bg-[#E3F0E5] text-[#176B45] font-extrabold px-2 py-0.5 rounded">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#176B45]" />
              <span>KYC Status: {user?.kycStatus || 'VERIFIED'}</span>
            </p>
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-[#176B45]" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full py-2.5 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-slate-800 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Phone Number (Registered)</label>
            <input
              type="text"
              disabled
              value={user?.phoneNumber || '9876543210'}
              className="w-full py-2.5 px-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono font-bold cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">City / Tehsil</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-forest py-2.5 px-5 text-xs font-bold shadow-md cursor-pointer mt-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
