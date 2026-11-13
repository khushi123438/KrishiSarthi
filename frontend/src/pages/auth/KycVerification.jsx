import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Upload, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const KycVerification = () => {
  const { user } = useAuth();
  const [docType, setDocType] = useState('AADHAAR');
  const [docNumber, setDocNumber] = useState('');
  const [docFile, setDocFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(user?.kycStatus === 'VERIFIED' || user?.kycStatus === 'PENDING');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-[#104B32] text-white rounded-2xl p-6 shadow-card space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <span className="text-xs bg-emerald-800/80 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-emerald-200">
            Govt. Identity Compliance
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black">KYC Document Verification</h1>
        <p className="text-xs text-emerald-100">
          Verify your identity to unlock direct escrow settlements, bank transfers, and verified trader badges.
        </p>
      </div>

      {submitted ? (
        <div className="card-krishi p-8 text-center space-y-3 bg-white border border-[#E3F0E5]">
          <div className="w-14 h-14 bg-[#E3F0E5] text-[#176B45] rounded-full flex items-center justify-center mx-auto">
            {user?.kycStatus === 'VERIFIED' ? <CheckCircle2 className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
          </div>
          <h3 className="text-base font-extrabold text-[#104B32]">
            {user?.kycStatus === 'VERIFIED' ? 'KYC Status: Fully Verified' : 'KYC Verification in Progress'}
          </h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            {user?.kycStatus === 'VERIFIED'
              ? 'Your government documents have been verified by the KrishiSarthi platform compliance team.'
              : 'Our compliance officer is reviewing your uploaded documents. Approval usually takes 2 to 4 hours.'}
          </p>
          <div className="pt-2">
            <span className="bg-[#E3F0E5] text-[#176B45] text-xs font-bold px-3 py-1 rounded-full border border-[#C8E1CC]">
              Status: {user?.kycStatus || 'UNDER_REVIEW'}
            </span>
          </div>
        </div>
      ) : (
        <div className="card-krishi p-6 sm:p-8 bg-white border border-[#E3F0E5] space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Identity Document *
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
              >
                <option value="AADHAAR">Aadhaar Card (UIDAI)</option>
                <option value="PAN">PAN Card (Income Tax Dept)</option>
                <option value="LAND_7_12">7/12 Land Ownership Record (Khasra/Khatauni)</option>
                <option value="DRIVING_LICENSE">Commercial Driving License (Transport Dept)</option>
                <option value="GST">GST Registration Certificate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Document Number *
              </label>
              <input
                type="text"
                required
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                placeholder="e.g. 1234 5678 9012 or HR-05-2018-009"
                className="w-full py-2.5 px-3 bg-[#F0F7F0] border border-[#C8E1CC] rounded-xl text-xs text-slate-800 font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176B45]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Upload Document Copy (Photo or PDF) *
              </label>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#C8E1CC] rounded-xl cursor-pointer hover:bg-[#F0F7F0] transition-colors text-center">
                <Upload className="w-6 h-6 text-[#176B45] mb-2" />
                <span className="text-xs font-bold text-[#104B32]">
                  {docFile ? docFile.name : 'Click to upload or drag & drop'}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, or PDF up to 10MB</span>
                <input
                  type="file"
                  required
                  accept="image/*,application/pdf"
                  onChange={(e) => setDocFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !docFile}
              className="w-full btn-forest py-3 text-xs font-bold shadow-md cursor-pointer mt-2"
            >
              {loading ? 'Submitting Verification...' : 'Submit Documents for Verification'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
