import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buyerService } from '../../services/buyerService';
import {
  Sprout,
  ShoppingBag,
  Truck,
  ShieldCheck,
  TrendingUp,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  DollarSign,
  QrCode,
  Scale,
  Clock,
  ChevronRight
} from 'lucide-react';

// Curated high-resolution agricultural photographs
const HERO_FARMER_IMG = "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80";
const FINAL_CTA_IMG = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80";

export const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    buyerService.getMarketplace()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setCrops(res.data.slice(0, 6));
        }
      })
      .catch(() => {
        // Fallback default crops preview
      });
  }, []);

  const sampleCrops = [
    {
      id: 1,
      cropName: 'Wheat (Sharbati C-306)',
      variety: 'C-306 Traditional Gold',
      quantity: 50.0,
      unit: 'QUINTAL',
      expectedPricePerUnit: 2450.0,
      qualityGrade: 'GRADE_A',
      batchCode: 'KB-2026-WHT-001',
      farmLocation: 'Karnal, Haryana',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      cropName: 'Basmati Rice (Pusa 1121)',
      variety: 'Pusa 1121 Extra Long',
      quantity: 35.0,
      unit: 'QUINTAL',
      expectedPricePerUnit: 3850.0,
      qualityGrade: 'GRADE_A',
      batchCode: 'KB-2026-RIC-002',
      farmLocation: 'Taraori, Haryana',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      cropName: 'Mustard Seeds / Sarson',
      variety: 'Pusa Bold High Oil',
      quantity: 40.0,
      unit: 'QUINTAL',
      expectedPricePerUnit: 5400.0,
      qualityGrade: 'GRADE_B',
      batchCode: 'KB-2026-MUS-003',
      farmLocation: 'Alwar, Rajasthan',
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      cropName: 'Potato / Aloo (Agra Jyoti)',
      variety: 'Kufri Jyoti Table Grade',
      quantity: 120.0,
      unit: 'QUINTAL',
      expectedPricePerUnit: 1350.0,
      qualityGrade: 'GRADE_A',
      batchCode: 'KB-2026-POT-004',
      farmLocation: 'Agra, Uttar Pradesh',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      cropName: 'Red Onion / Nashik Pyaz',
      variety: 'Garwa Medium Red',
      quantity: 80.0,
      unit: 'QUINTAL',
      expectedPricePerUnit: 2350.0,
      qualityGrade: 'GRADE_A',
      batchCode: 'KB-2026-ONI-005',
      farmLocation: 'Lasalgaon, Maharashtra',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      cropName: 'Green Chickpeas / Desi Chana',
      variety: 'Pusa 362 Bold',
      quantity: 25.0,
      unit: 'QUINTAL',
      expectedPricePerUnit: 5650.0,
      qualityGrade: 'GRADE_A',
      batchCode: 'KB-2026-CHA-006',
      farmLocation: 'Indore, Madhya Pradesh',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const displayedCrops = crops.length > 0 ? crops : sampleCrops;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* SECTION B: HERO SECTION (Rich Forest Green with Indian Farmer Photography) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#104B32] via-[#176B45] to-[#0A2E1F] text-white py-16 sm:py-24">
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8E1CC_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>{t('hero.badge')}</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  {t('hero.title_main')}{' '}
                  <span className="text-amber-300">{t('hero.title_highlight')}</span><br />
                  {t('hero.title_sub')}
                </h1>
                
              </div>

              <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                {t('hero.desc')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/marketplace"
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-elevated transition-all active:scale-95 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  <span>{t('hero.cta_explore')}</span>
                </Link>

                <a
                  href="#how-it-works"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm px-6 py-3.5 rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <span>{t('hero.cta_how')}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* Stat counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15 text-center lg:text-left">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-amber-300">10,000+</span>
                  <p className="text-[11px] text-emerald-200 font-medium">{t('hero.stat_farmers')}</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white">1,500+</span>
                  <p className="text-[11px] text-emerald-200 font-medium">{t('hero.stat_buyers')}</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-amber-300">₹45 Cr+</span>
                  <p className="text-[11px] text-emerald-200 font-medium">{t('hero.stat_gmv')}</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white">100%</span>
                  <p className="text-[11px] text-emerald-200 font-medium">{t('hero.stat_payout')}</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card: Realistic Indian Farmer in Lush Green Fields */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl shadow-emerald-950/80 group">
                <img
                  src={HERO_FARMER_IMG}
                  alt="Indian farmer standing proudly in lush green crop field"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                {/* Floating Real-Time Trust Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 text-[#104B32] shadow-xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#176B45] text-white flex items-center justify-center font-bold">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-extrabold text-xs block text-[#104B32]">Kisan Escrow Protected</span>
                      <span className="text-[10px] text-slate-500">Zero Middleman &bull; Direct Bank/UPI Payout</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#176B45] bg-[#E3F0E5] px-2.5 py-1 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION C: TRUST & FEATURE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-extrabold text-[#176B45] uppercase tracking-wider bg-[#E3F0E5] px-3 py-1 rounded-full border border-[#C8E1CC]">
            Direct Agri Grid Advantage
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#104B32]">
            {t('features.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="card-krishi p-6 space-y-3 bg-white border border-[#E3F0E5]">
            <div className="w-12 h-12 rounded-2xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center text-xl font-bold mb-2">
              🌾
            </div>
            <h3 className="font-extrabold text-base text-[#104B32]">{t('features.f1_title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('features.f1_desc')}</p>
          </div>

          {/* Card 2 */}
          <div className="card-krishi p-6 space-y-3 bg-white border border-[#E3F0E5]">
            <div className="w-12 h-12 rounded-2xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center text-xl font-bold mb-2">
              <Scale className="w-6 h-6 text-[#176B45]" />
            </div>
            <h3 className="font-extrabold text-base text-[#104B32]">{t('features.f2_title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('features.f2_desc')}</p>
          </div>

          {/* Card 3 */}
          <div className="card-krishi p-6 space-y-3 bg-white border border-[#E3F0E5]">
            <div className="w-12 h-12 rounded-2xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center text-xl font-bold mb-2">
              <Truck className="w-6 h-6 text-[#176B45]" />
            </div>
            <h3 className="font-extrabold text-base text-[#104B32]">{t('features.f3_title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('features.f3_desc')}</p>
          </div>

          {/* Card 4 */}
          <div className="card-krishi p-6 space-y-3 bg-white border border-[#E3F0E5]">
            <div className="w-12 h-12 rounded-2xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center text-xl font-bold mb-2">
              <ShieldCheck className="w-6 h-6 text-[#176B45]" />
            </div>
            <h3 className="font-extrabold text-base text-[#104B32]">{t('features.f4_title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('features.f4_desc')}</p>
          </div>
        </div>
      </section>

      {/* SECTION D: MARKETPLACE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider bg-[#E3F0E5] px-3 py-1 rounded-full">
              {t('market_preview.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#104B32] mt-2">
              {t('market_preview.title')}
            </h2>
            <p className="text-xs text-slate-600">
              {t('market_preview.subtitle')}
            </p>
          </div>

          <Link
            to="/marketplace"
            className="btn-outline-forest text-xs py-2 px-4 whitespace-nowrap self-start sm:self-auto"
          >
            <span>{t('market_preview.view_all')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCrops.map((crop) => (
            <div key={crop.id} className="card-krishi overflow-hidden group flex flex-col justify-between">
              {/* Image & Badges */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={crop.image || sampleCrops[0].image}
                  alt={crop.cropName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="bg-[#104B32]/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                    {crop.qualityGrade}
                  </span>
                </div>
                {crop.batchCode && (
                  <Link
                    to={`/trace?batch=${crop.batchCode}`}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#104B32] text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 hover:bg-white"
                  >
                    <QrCode className="w-3 h-3 text-[#176B45]" />
                    <span>{crop.batchCode}</span>
                  </Link>
                )}
              </div>

              {/* Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#176B45] transition-colors">
                    {crop.cropName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Variety: {crop.variety}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-slate-600 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{crop.farmLocation || 'Karnal, Haryana'}</span>
                  </div>

                  <div className="mt-2.5 p-2 rounded-lg bg-[#F0F7F0] border border-[#E3F0E5] flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{t('market_preview.qty')}:</span>
                    <span className="font-extrabold text-[#104B32]">{crop.quantity} {crop.unit}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t('market_preview.listed_at')}</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lg font-black text-[#176B45]">₹{crop.expectedPricePerUnit}</span>
                      <span className="text-[10px] text-slate-500">/{crop.unit}</span>
                    </div>
                  </div>

                  <Link
                    to={`/marketplace?offerCrop=${crop.id}`}
                    className="btn-forest text-xs py-2 px-3 shadow-sm"
                  >
                    <span>{t('market_preview.btn_offer')}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION E: FAIR PRICE INTELLIGENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#E3F0E5]/70 rounded-3xl p-6 sm:p-12 border border-[#C8E1CC] space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#C8E1CC]">
              {t('intelligence.badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#104B32]">
              {t('intelligence.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t('intelligence.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            
            {/* Traditional Mandi Intermediary breakdown */}
            <div className="card-krishi p-6 bg-white border border-red-200 shadow-subtle space-y-3">
              <span className="text-xs font-extrabold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full uppercase">
                Traditional Mandi Trade
              </span>
              <h4 className="font-bold text-slate-800 text-sm">Wheat (Sharbati) 50 Quintals</h4>
              
              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">{t('intelligence.mandi_benchmark')}</span>
                  <span className="font-bold">₹2,275 / Qtl</span>
                </div>
                <div className="flex justify-between py-1.5 text-red-600">
                  <span>Aarhtiya Commission (2.5%)</span>
                  <span>- ₹2,840</span>
                </div>
                <div className="flex justify-between py-1.5 text-red-600">
                  <span>Loading & Unloading Fees</span>
                  <span>- ₹1,500</span>
                </div>
                <div className="flex justify-between py-1.5 text-red-600">
                  <span>Mandi Cess & Hidden Dues</span>
                  <span>- ₹1,800</span>
                </div>
                <div className="flex justify-between py-2 font-black text-slate-800 border-t-2 border-slate-200 text-sm">
                  <span>Net Farmer Realization:</span>
                  <span className="text-red-700">₹1,07,610</span>
                </div>
              </div>
            </div>

            {/* KrishiSarthi Direct Fair Trade breakdown */}
            <div className="card-krishi p-6 bg-white border-2 border-[#176B45] shadow-card space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#176B45] text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Direct KrishiSarthi
              </div>

              <span className="text-xs font-extrabold text-[#176B45] bg-[#E3F0E5] border border-[#C8E1CC] px-2.5 py-0.5 rounded-full uppercase">
                Direct Buyer Connection
              </span>
              <h4 className="font-bold text-[#104B32] text-sm">Wheat (Sharbati) 50 Quintals</h4>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">{t('intelligence.direct_offer')}</span>
                  <span className="font-bold text-slate-900">₹2,450 / Qtl</span>
                </div>
                <div className="flex justify-between py-1.5 text-[#176B45] font-semibold">
                  <span>{t('intelligence.middleman_cut')}</span>
                  <span>₹0 Commission</span>
                </div>
                <div className="flex justify-between py-1.5 text-[#176B45] font-semibold">
                  <span>Smart Truck Freight Sharing</span>
                  <span>- ₹3,500</span>
                </div>
                <div className="flex justify-between py-2 font-black text-slate-900 border-t-2 border-[#176B45] text-sm">
                  <span>{t('intelligence.farmer_net')}:</span>
                  <span className="text-[#176B45] text-base font-black">₹1,19,000</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="bg-[#F0F7F0] p-2.5 rounded-xl border border-[#C8E1CC] text-center text-xs font-bold text-[#176B45]">
                  Extra Farmer Profit: +₹11,390 (+10.5% More Realization)
                </div>
              </div>
            </div>

          </div>

          <p className="text-center text-[11px] text-slate-500 max-w-xl mx-auto italic">
            {t('intelligence.comparison_note')}
          </p>
        </div>
      </section>

      {/* SECTION F: SMART LOGISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider bg-[#E3F0E5] px-3 py-1 rounded-full">
            {t('logistics.badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#104B32]">
            {t('logistics.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t('logistics.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-krishi p-6 space-y-3 bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{t('logistics.card1_title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('logistics.card1_desc')}</p>
          </div>

          <div className="card-krishi p-6 space-y-3 bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{t('logistics.card2_title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('logistics.card2_desc')}</p>
          </div>

          <div className="card-krishi p-6 space-y-3 bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{t('logistics.card3_title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('logistics.card3_desc')}</p>
          </div>

          <div className="card-krishi p-6 space-y-3 bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{t('logistics.card4_title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('logistics.card4_desc')}</p>
          </div>
        </div>
      </section>

      {/* SECTION G: HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold text-[#176B45] uppercase tracking-wider bg-[#E3F0E5] px-3 py-1 rounded-full">
            {t('steps.badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#104B32]">
            {t('steps.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-krishi p-6 bg-white space-y-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#104B32] text-white flex items-center justify-center font-black text-sm mx-auto sm:mx-0">
              1
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">{t('steps.step1_title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('steps.step1_desc')}</p>
          </div>

          <div className="card-krishi p-6 bg-white space-y-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#104B32] text-white flex items-center justify-center font-black text-sm mx-auto sm:mx-0">
              2
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">{t('steps.step2_title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('steps.step2_desc')}</p>
          </div>

          <div className="card-krishi p-6 bg-white space-y-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#104B32] text-white flex items-center justify-center font-black text-sm mx-auto sm:mx-0">
              3
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">{t('steps.step3_title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('steps.step3_desc')}</p>
          </div>

          <div className="card-krishi p-6 bg-white space-y-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#104B32] text-white flex items-center justify-center font-black text-sm mx-auto sm:mx-0">
              4
            </div>
            <h4 className="font-extrabold text-slate-900 text-base">{t('steps.step4_title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('steps.step4_desc')}</p>
          </div>
        </div>
      </section>

      {/* SECTION H: FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#104B32] text-white p-8 sm:p-16 text-center space-y-6 shadow-2xl">
          <img
            src={FINAL_CTA_IMG}
            alt="Lush green wheat field during golden hour"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
          />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-extrabold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20 text-emerald-200">
              Join the Movement
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-lg mx-auto">
              {t('cta.desc')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
              >
                {t('cta.btn_start')}
              </Link>
              <Link
                to="/marketplace"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm px-7 py-3.5 rounded-xl backdrop-blur-md transition-all"
              >
                {t('cta.btn_browse')}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
