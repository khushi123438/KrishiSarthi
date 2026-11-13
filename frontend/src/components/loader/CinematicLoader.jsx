import React, { useState, useEffect } from 'react';

// Premium high-res realistic Indian agricultural photography (lush green paddy fields & farmer)
const FARMER_CINEMATIC_PHOTO = "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1920&q=85";

export const CinematicLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1); // 1: photo fade, 2: logo, 3: tagline, 4: supporting text, 5: exit
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload photo
  useEffect(() => {
    const img = new Image();
    img.src = FARMER_CINEMATIC_PHOTO;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // Don't block if offline
  }, []);

  // 8.5 second smooth animation timeline
  useEffect(() => {
    const startTime = Date.now();
    const duration = 8500; // 8.5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (elapsed > 1200 && stage < 2) setStage(2);
      if (elapsed > 2800 && stage < 3) setStage(3);
      if (elapsed > 4500 && stage < 4) setStage(4);

      if (elapsed >= duration) {
        clearInterval(interval);
        setStage(5);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [stage, onComplete]);

  const handleSkip = () => {
    setStage(5);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#104B32] transition-opacity duration-700 overflow-hidden select-none ${
        stage === 5 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Cinematic Background Image with smooth scale & dark-green gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={FARMER_CINEMATIC_PHOTO}
          alt="Indian Farmer in lush green agricultural field"
          className={`w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-all duration-1000 ease-out transform ${
            imageLoaded ? 'scale-105 opacity-85' : 'scale-100 opacity-0'
          }`}
          style={{ transitionDuration: '9000ms' }}
        />
        {/* Cinematic deep forest green gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E1F] via-[#104B32]/75 to-[#0A2E1F]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60" />
      </div>

      {/* Top Header / Skip Button */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-200 text-xs font-bold tracking-widest uppercase">
            Smart Agricultural Grid &bull; भारत
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="text-white/70 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 transition-all cursor-pointer"
        >
          Skip Intro &rarr;
        </button>
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-6">
        
        {/* KrishiSarthi Emblem & Brand Name */}
        <div
          className={`transition-all duration-1000 transform ${
            stage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#176B45] to-[#238959] border-2 border-emerald-300/40 shadow-2xl shadow-emerald-950/80 mb-4">
            <span className="text-3xl sm:text-4xl">🌾</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-md">
            KrishiSarthi
          </h1>
          <p className="text-xs sm:text-sm font-extrabold text-emerald-300 tracking-widest uppercase mt-1">
            कृषिसारथी &bull; FARMLINK PRO
          </p>
        </div>

        {/* Tagline */}
        <div
          className={`transition-all duration-1000 delay-300 transform ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xl sm:text-2xl font-bold text-amber-300 tracking-wide font-hindi drop-shadow">
            "खेत से बाज़ार तक, आपका साथी।"
          </p>
        </div>

        {/* Supporting Text */}
        <div
          className={`transition-all duration-1000 delay-500 transform ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium tracking-wider">
            Growing Something Better...
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 pb-12 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-emerald-200">
          <span>Connecting Farm Network</span>
          <span className="font-bold text-amber-300">{progress}%</span>
        </div>

        {/* Sleek Progress Bar */}
        <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-emerald-500/20 backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 transition-all ease-out duration-100 rounded-full shadow-lg shadow-emerald-400/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-center text-[10px] text-emerald-300/70 tracking-widest uppercase">
          Empowering 100,000+ Indian Farmers
        </p>
      </div>
    </div>
  );
};
