import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle, ArrowRight, Banknote } from 'lucide-react';
import { escrowService } from '../services/escrowService';

export const EscrowCard = ({ escrow, orderId, isBuyer = false, onPayoutSuccess }) => {
  const [releasing, setReleasing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [message, setMessage] = useState(null);

  const handleRelease = async () => {
    setReleasing(true);
    setMessage(null);
    try {
      await escrowService.releasePayout(orderId, {
        upiId: upiId || 'ramesh.farmer@upi',
        bankAccountNumber: '123456789012',
        ifscCode: 'SBIN0001234',
        remarks: 'Delivery confirmed and accepted by buyer',
      });
      setMessage({ type: 'success', text: 'Escrow settlement released successfully to farmer account!' });
      if (onPayoutSuccess) onPayoutSuccess();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to release escrow funds.' });
    } finally {
      setReleasing(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'RELEASED':
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Funds Released</span>;
      case 'HELD':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Securely Held</span>;
      case 'DISPUTED':
        return <span className="bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Disputed</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-0.5 rounded-full font-bold">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-emerald-200 p-4 shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <span>KrishiSarthi Escrow Shield</span>
              <Lock className="w-3 h-3 text-slate-400" />
            </h4>
            <p className="text-[10px] text-slate-500">100% Protected Payment Holding & Settlement</p>
          </div>
        </div>
        <div>{getStatusBadge(escrow?.status || 'HELD')}</div>
      </div>

      {/* Financial Breakdown */}
      <div className="py-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-slate-50 p-2 rounded-lg">
          <span className="text-[10px] text-slate-500 block">Total In Escrow</span>
          <span className="font-extrabold text-slate-900">₹{escrow?.totalHeldAmount || '1,12,200'}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg">
          <span className="text-[10px] text-slate-500 block">Platform Fee (2%)</span>
          <span className="font-extrabold text-slate-900">₹{escrow?.platformFee || '2,200'}</span>
        </div>
        <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
          <span className="text-[10px] text-emerald-700 block font-bold">Farmer Net Payout</span>
          <span className="font-extrabold text-emerald-800">₹{escrow?.farmerPayoutAmount || '1,10,000'}</span>
        </div>
      </div>

      {/* Status Description */}
      <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p>
          Buyer funds remain safely frozen until delivery proof is verified and goods are physically inspected at the destination.
        </p>
      </div>

      {message && (
        <div
          className={`mt-2 p-2 rounded text-xs font-semibold ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Action if held */}
      {escrow?.status !== 'RELEASED' && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <input
            type="text"
            placeholder="Farmer UPI ID (e.g. farmer@upi)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            onClick={handleRelease}
            disabled={releasing}
            className="btn-primary text-xs py-2 px-3 whitespace-nowrap"
          >
            <Banknote className="w-3.5 h-3.5" />
            <span>{releasing ? 'Releasing...' : 'Confirm Delivery & Release'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
