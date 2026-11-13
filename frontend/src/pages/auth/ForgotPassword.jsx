import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Phone, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.sendOtp(phoneNumber, 'PASSWORD_RESET');
      setSent(true);
      setTimeout(() => {
        navigate(`/verify-otp?phone=${phoneNumber}&purpose=PASSWORD_RESET`);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check your phone number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E3F0E5] shadow-card p-6 sm:p-8 space-y-6">
        
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E3F0E5] text-[#176B45] text-2xl mb-2">
            🔑
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#104B32]">
            Forgot Password
          </h1>
          <p className="text-xs text-slate-500">
            Enter your registered 10-digit phone number to receive a verification OTP.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {sent ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#176B45] mx-auto" />
            <p className="text-xs font-bold text-[#104B32]">
              OTP sent successfully! Redirecting to verification...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-3 py-2.5 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-forest py-3 text-xs font-bold shadow-md cursor-pointer"
            >
              {loading ? 'Sending Verification OTP...' : 'Send OTP via SMS'}
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link to="/login" className="text-xs font-bold text-[#176B45] hover:underline">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
