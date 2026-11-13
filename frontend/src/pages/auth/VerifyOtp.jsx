import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';

export const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone') || '';
  const purpose = searchParams.get('purpose') || 'PASSWORD_RESET';
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.verifyOtp(phone, otp, purpose);
      navigate(`/reset-password?phone=${phone}&token=verified`);
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP. Please check and re-enter.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E3F0E5] shadow-card p-6 sm:p-8 space-y-6">
        
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E3F0E5] text-[#176B45] text-2xl mb-2">
            📲
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#104B32]">
            Enter Verification Code
          </h1>
          <p className="text-xs text-slate-500">
            A 6-digit code was sent to <strong className="text-slate-800">{phone || 'your phone'}</strong>.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              6-Digit OTP *
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="e.g. 123456"
                className="w-full pl-10 pr-3 py-2.5 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-center text-lg tracking-widest font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length < 4}
            className="w-full btn-forest py-3 text-xs font-bold shadow-md cursor-pointer"
          >
            {loading ? 'Verifying Code...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};
