import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { farmerService } from '../../services/farmerService';
import { Modal } from '../../components/Modal';
import { Inbox, CheckCircle, XCircle, RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';

export const FarmerOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOffer, setActiveOffer] = useState(null);
  const [counterPrice, setCounterPrice] = useState('');
  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const fetchOffers = async () => {
    try {
      const res = await farmerService.getOffers();
      setOffers(res.data || []);
    } catch (err) {
      console.error('Failed to load offers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleRespond = async (offerId, action, counterVal = null) => {
    setActionLoading(true);
    setAlertMsg(null);
    try {
      await farmerService.respondToOffer(offerId, {
        action,
        counterPrice: counterVal ? parseFloat(counterVal) : null,
        comments: `Offer ${action.toLowerCase()} by farmer`,
      });
      setAlertMsg({
        type: 'success',
        text: action === 'ACCEPTED'
          ? 'Offer Accepted! Order created automatically and ready for buyer payment.'
          : `Offer status updated to ${action}.`
      });
      setCounterModalOpen(false);
      fetchOffers();
    } catch (err) {
      setAlertMsg({ type: 'error', text: err.message || 'Failed to update offer' });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Pending Review</span>;
      case 'ACCEPTED':
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Accepted & Ordered</span>;
      case 'COUNTERED':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Counter Propose Sent</span>;
      case 'REJECTED':
        return <span className="bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Rejected</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-0.5 rounded-full font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Link to="/farmer" className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Received Price Offers</h1>
          <p className="text-xs text-slate-500">Negotiate and accept buyer bids with instant order creation</p>
        </div>
      </div>

      {alertMsg && (
        <div
          className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
            alertMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {alertMsg.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{alertMsg.text}</span>
        </div>
      )}

      {/* Offers Feed */}
      <div className="space-y-3">
        {offers.length === 0 ? (
          <div className="card-base p-8 text-center text-slate-400">
            <Inbox className="w-12 h-12 mx-auto mb-2 opacity-40 text-amber-500" />
            <p className="text-sm font-semibold text-slate-600">No price offers received yet.</p>
            <p className="text-xs text-slate-400 mt-1">Offers made by buyers in the marketplace will appear here.</p>
          </div>
        ) : (
          offers.map((offer) => (
            <div key={offer.id} className="card-base p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-base">{offer.cropName}</span>
                    {getStatusBadge(offer.status)}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Buyer: <span className="font-semibold text-slate-700">{offer.buyerName}</span> &bull; Delivery: {offer.deliveryPreference || 'Buyer Warehouse'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Total Transaction Value</span>
                  <span className="text-lg font-extrabold text-emerald-800">
                    ₹{(offer.offeredPricePerUnit * offer.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Offer Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Offered Rate</span>
                  <span className="font-bold text-slate-800">₹{offer.offeredPricePerUnit} / {offer.unit || 'QUINTAL'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Requested Quantity</span>
                  <span className="font-bold text-slate-800">{offer.quantity} {offer.unit || 'QUINTAL'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Offer Received</span>
                  <span className="font-medium text-slate-600">
                    {offer.createdAt ? new Date(offer.createdAt).toLocaleDateString() : 'Today'}
                  </span>
                </div>
              </div>

              {offer.notes && (
                <p className="text-xs text-slate-600 italic bg-amber-50/50 p-2 rounded border border-amber-100">
                  Buyer Note: "{offer.notes}"
                </p>
              )}

              {/* Action Buttons */}
              {offer.status === 'PENDING' && (
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleRespond(offer.id, 'REJECTED')}
                    disabled={actionLoading}
                    className="p-2 px-3 rounded-lg border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveOffer(offer);
                      setCounterPrice(offer.offeredPricePerUnit);
                      setCounterModalOpen(true);
                    }}
                    disabled={actionLoading}
                    className="p-2 px-3 rounded-lg border border-blue-200 text-blue-700 font-bold text-xs hover:bg-blue-50 transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Counter Offer</span>
                  </button>

                  <button
                    onClick={() => handleRespond(offer.id, 'ACCEPTED')}
                    disabled={actionLoading}
                    className="btn-primary text-xs py-2 px-4 shadow-sm"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Accept Offer</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Counter Offer Modal */}
      <Modal
        isOpen={counterModalOpen}
        onClose={() => setCounterModalOpen(false)}
        title="Propose Counter Price"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Propose a revised price per {activeOffer?.unit || 'Quintal'} to {activeOffer?.buyerName}.
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Counter Price (₹ per {activeOffer?.unit || 'Quintal'})
            </label>
            <input
              type="number"
              step="any"
              value={counterPrice}
              onChange={(e) => setCounterPrice(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setCounterModalOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={() => handleRespond(activeOffer?.id, 'COUNTERED', counterPrice)}
              disabled={actionLoading || !counterPrice}
              className="btn-primary text-xs py-2 px-4"
            >
              Send Counter Offer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
