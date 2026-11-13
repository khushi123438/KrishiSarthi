import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-[#E3F0E5] text-[#176B45] flex items-center justify-center text-3xl font-bold">
        🌾
      </div>
      <h1 className="text-4xl font-black text-[#104B32]">404</h1>
      <h2 className="text-lg font-bold text-slate-800">Page Not Found / पृष्ठ नहीं मिला</h2>
      <p className="text-xs text-slate-500 max-w-sm">
        The agricultural page or route you are looking for does not exist or has been relocated.
      </p>
      <Link to="/" className="btn-forest text-xs py-2.5 px-5 mt-2 shadow-sm">
        <Home className="w-4 h-4" />
        <span>Return to KrishiSarthi Home</span>
      </Link>
    </div>
  );
};
