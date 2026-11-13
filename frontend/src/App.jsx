import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './i18n'; // Initialize i18next
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';
import { CinematicLoader } from './components/loader/CinematicLoader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/BottomNav';
import { KisanMitraFab } from './components/KisanMitraFab';
import { NotificationDrawer } from './components/NotificationDrawer';
import { AppRoutes } from './routes/AppRoutes';

export const App = () => {
  // Check if the cinematic loader was already shown during this session
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('krishi_intro_shown');
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem('krishi_intro_shown', 'true');
    setShowIntro(false);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <NotificationProvider>
            {/* Cinematic 8-10 Second Full-screen Agricultural Loader on First Visit */}
            {showIntro && <CinematicLoader onComplete={handleLoaderComplete} />}

            <div className="min-h-screen flex flex-col bg-[#F0F7F0] text-[#104B32] selection:bg-[#E3F0E5] selection:text-[#104B32]">
              {/* Sticky Header Navbar */}
              <Navbar />

              {/* Main Page Content Router */}
              <main className="flex-1">
                <AppRoutes />
              </main>

              {/* Comprehensive Agricultural Footer */}
              <Footer />

              {/* Mobile Role-Specific Bottom Navigation Bar */}
              <BottomNav />

              {/* Floating Kisan Mitra Gemini AI Assistant */}
              <KisanMitraFab />

              {/* Slide-over Notification Center Drawer */}
              <NotificationDrawer />
            </div>
          </NotificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
