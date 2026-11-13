import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    brand_title: 'FARMLINK.IN',
    brand_subtitle: 'Smart Agricultural Marketplace',
    tagline: 'Direct Farm-to-Buyer Marketplace with Instant Payments & Live Tracking',
    nav_home: 'Home',
    nav_market: 'Marketplace',
    nav_crops: 'My Crops',
    nav_orders: 'My Orders',
    nav_shipments: 'Shipments',
    nav_freight: 'Freight Loads',
    nav_admin: 'Admin Panel',
    nav_trace: 'Trace QR',
    nav_weather: 'Weather & Mandi',
    login_btn: 'Login / Sign Up',
    logout_btn: 'Logout',
    role_farmer: 'Farmer',
    role_buyer: 'Buyer',
    role_transporter: 'Transporter',
    role_admin: 'Administrator',
    sell_crop_btn: '+ Sell Crop',
    view_offers_btn: 'Received Offers',
    kisan_mitra_ai: 'Kisan Mitra AI',
    kisan_mitra_subtitle: 'Your Agricultural AI Advisor (Hindi / English)',
    kisan_prompt_placeholder: 'Ask about crop disease, MSP prices, or weather...',
    weather_forecast: 'Weather & Mandi Ticker',
    verified_batch: 'Verified Batch',
    escrow_secured: 'Escrow Protected',
    kyc_status: 'KYC Status',
    kyc_verified: 'Verified',
    kyc_pending: 'Pending Verification',
  },
  hi: {
    brand_title: 'कृषिसारथी / FARMLINK',
    brand_subtitle: 'स्मार्ट कृषि बाज़ार और आपूर्ति श्रृंखला',
    tagline: 'सीधे किसान से खरीदार बाज़ार, तत्काल भुगतान और लाइव ट्रैकिंग के साथ',
    nav_home: 'होम',
    nav_market: 'मंडी बाज़ार',
    nav_crops: 'मेरी फसलें',
    nav_orders: 'मेरे ऑर्डर',
    nav_shipments: 'परिवहन',
    nav_freight: 'लोड बाज़ार',
    nav_admin: 'प्रशासक पैनल',
    nav_trace: 'क्यूआर जाँच',
    nav_weather: 'मौसम व भाव',
    login_btn: 'लॉग इन / साइन अप',
    logout_btn: 'लॉग आउट',
    role_farmer: 'किसान',
    role_buyer: 'खरीदार / व्यापारी',
    role_transporter: 'ट्रांसपोर्टर',
    role_admin: 'प्रशासक',
    sell_crop_btn: '+ फसल बेचें',
    view_offers_btn: 'प्राप्त बोलियाँ',
    kisan_mitra_ai: 'किसान मित्र एआई',
    kisan_mitra_subtitle: 'आपका कृषि सलाहकार (हिंदी और हिंग्लिश)',
    kisan_prompt_placeholder: 'फसल रोग, सरकारी भाव, या मौसम के बारे में पूछें...',
    weather_forecast: 'लाइव मौसम व मंडी भाव',
    verified_batch: 'सत्यापित बैच',
    escrow_secured: 'एस्क्रो सुरक्षित भुगतान',
    kyc_status: 'केवाईसी स्थिति',
    kyc_verified: 'सत्यापित',
    kyc_pending: 'सत्यापन प्रक्रिया में',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('krishi_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('krishi_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
