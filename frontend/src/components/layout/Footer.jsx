import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#104B32] text-white border-t border-[#176B45]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#176B45] to-[#238959] flex items-center justify-center text-white border border-emerald-400/40">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  {t('brand.name')}
                </span>
                <p className="text-[11px] text-emerald-300 font-medium font-hindi leading-none">
                  {t('brand.tagline_hindi')}
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm">
              {t('footer.desc')} 
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold bg-[#0D3D28] p-3 rounded-xl border border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Escrow Protected &bull; ISO & Agmarknet Aligned</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/90 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/marketplace" className="hover:text-white transition-colors">{t('nav.marketplace')}</Link></li>
              <li><a href="/#how-it-works" className="hover:text-white transition-colors">{t('nav.how_it_works')}</a></li>
              <li><Link to="/weather" className="hover:text-white transition-colors">{t('nav.weather_mandi')}</Link></li>
              <li><Link to="/trace" className="hover:text-white transition-colors">{t('nav.trace_qr')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
            </ul>
          </div>

          {/* Commodity Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {t('footer.marketplace_links')}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/90 font-medium">
              <li><Link to="/marketplace?crop=Wheat" className="hover:text-white transition-colors">Wheat (गेहूँ Sharbati)</Link></li>
              <li><Link to="/marketplace?crop=Rice" className="hover:text-white transition-colors">Basmati Rice (Pusa 1121)</Link></li>
              <li><Link to="/marketplace?crop=Mustard" className="hover:text-white transition-colors">Mustard / Sarson (सरसों)</Link></li>
              <li><Link to="/marketplace?crop=Potato" className="hover:text-white transition-colors">Potato (आलू Agra Jyoti)</Link></li>
              <li><Link to="/marketplace?crop=Onion" className="hover:text-white transition-colors">Onion (प्याज Nashik Red)</Link></li>
              <li><Link to="/marketplace?crop=Pulses" className="hover:text-white transition-colors">Pulses & Chana (चना व दालें)</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/90">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                <span>Toll-Free Kisan Helpline: 1800-FARMLINK</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                <span>support@krishisarthi.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
                <span>Agri Logistics Grid Hub, GT Road, Karnal, Haryana 132001</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="flex gap-3 text-xs font-semibold">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <span>&bull;</span>
                <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                <span>&bull;</span>
                <Link to="/support" className="hover:text-white transition-colors">Help</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#176B45]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <p>© {new Date().getFullYear()} KrishiSarthi (FarmLink.in). {t('footer.copyright')}</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
            <span>for Farmers & Agri Commerce across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
