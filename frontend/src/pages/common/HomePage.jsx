import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sprout,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  QrCode
} from 'lucide-react';

export const HomePage = () => {
  const { isAuthenticated, role, openAuthModal } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleRoleAction = (targetRole, path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      openAuthModal('login');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-10">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-8 sm:p-12 shadow-card border border-emerald-700/50">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-400/40 text-xs font-bold text-emerald-200">
            <span>🌾 Next-Gen Agricultural Grid</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Mandi & Escrow</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Fair Price for Farmers.<br />
            <span className="text-amber-400">Direct Sourcing</span> for Buyers.
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed">
            KrishiSarthi connects farmers directly with buyers and transporters with transparent wholesale pricing, 100% escrow-backed instant settlements, and cryptographic crop batch QR traceability.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => handleRoleAction('FARMER', '/farmer')}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <Sprout className="w-4 h-4" />
              <span>Sell Your Harvest (+ फसल बेचें)</span>
            </button>

            <Link
              to="/buyer/market"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm px-6 py-3 rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Marketplace</span>
            </Link>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute right-[-40px] bottom-[-40px] opacity-10 text-[260px] select-none pointer-events-none">
          🌾
        </div>
      </div>

      {/* 3 Core Roles Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Farmer Card */}
        <div
          onClick={() => handleRoleAction('FARMER', '/farmer')}
          className="card-base p-6 cursor-pointer group hover:border-emerald-500 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🌾
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">
            For Farmers (किसान)
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            List your crop with voice or text, eliminate commission agents, receive bids with counter-offers, and get paid instantly upon delivery.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
            <span>Enter Farmer Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Buyer Card */}
        <div
          onClick={() => handleRoleAction('BUYER', '/buyer/market')}
          className="card-base p-6 cursor-pointer group hover:border-blue-500 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🏢
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
            For Buyers & Traders
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Source bulk certified grains, oilseeds, and vegetables directly from verified farm gates with Razorpay checkout and live GPS delivery tracking.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
            <span>Explore Live Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Transporter Card */}
        <div
          onClick={() => handleRoleAction('TRANSPORTER', '/transporter/loads')}
          className="card-base p-6 cursor-pointer group hover:border-amber-500 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            🚚
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-700 transition-colors">
            For Transporters
          </h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Find return loads on high-demand mandi routes, place competitive freight bids, broadcast live vehicle GPS, and get assured freight payouts.
          </p>
          <div className="mt-4 flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
            <span>Find Freight Loads</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="card-base p-8 bg-white border border-slate-200">
        <div className="text-center max-w-lg mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Built for Real Indian Agriculture
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Engineered to overcome trust barriers, payment delays, and supply chain opacity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-800">Krishi Escrow</h4>
            <p className="text-xs text-slate-500">
              Payments are locked securely upon order confirmation and released directly to farmers upon verified delivery.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-800">QR Traceability</h4>
            <p className="text-xs text-slate-500">
              Every harvest gets a unique cryptographic batch code with full farm-to-table journey records accessible to anyone.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-800">Live GPS Tracking</h4>
            <p className="text-xs text-slate-500">
              Interactive Leaflet maps show truck waypoints, driver status, and accurate delivery ETAs in real-time.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-800">Kisan Mitra AI</h4>
            <p className="text-xs text-slate-500">
              Gemini AI-powered multilingual advisor in Hindi & English for crop health, MSP rates, and voice-to-listing assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
