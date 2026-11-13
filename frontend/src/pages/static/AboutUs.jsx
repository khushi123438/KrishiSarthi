import React from 'react';
import { ShieldCheck, Sprout, TrendingUp, Users, Heart } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider bg-[#E3F0E5] px-3 py-1 rounded-full border border-[#C8E1CC]">
          About KrishiSarthi
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#104B32]">
          Empowering India's Farmers Through Direct Trade
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          KrishiSarthi (FarmLink.in) was founded with a singular mission: to eliminate predatory agricultural middlemen, guarantee fair realization for farmers, and build a digital, transparent supply chain from farm gate to mandi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-krishi p-6 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center font-bold">
            <Sprout className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-[#104B32]">Farm Gate Sourcing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Farmers list produce right from their harvest fields, set reserve prices, and receive direct buyer bids.
          </p>
        </div>

        <div className="card-krishi p-6 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-[#104B32]">100% Escrow Protection</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Buyer funds are held securely in verified escrow before transit and released immediately upon delivery verification.
          </p>
        </div>

        <div className="card-krishi p-6 space-y-3 bg-white">
          <div className="w-10 h-10 rounded-xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-[#104B32]">Batch QR Traceability</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consumers and buyers scan unique batch QR codes to view farm origin, harvest dates, and pesticide screening logs.
          </p>
        </div>
      </div>
    </div>
  );
};
