import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { farmerService } from '../../services/farmerService';
import { Sprout, QrCode, Trash2, CheckCircle, Clock, XCircle, ArrowLeft } from 'lucide-react';

export const MyCrops = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [message, setMessage] = useState(null);

  const fetchListings = async () => {
    try {
      const res = await farmerService.getMyListings(filter === 'ALL' ? null : filter);
      setListings(res.data || []);
    } catch (err) {
      console.error('Failed to load listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filter]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this crop listing?')) return;
    try {
      await farmerService.cancelListing(id);
      setMessage('Crop listing cancelled successfully.');
      fetchListings();
    } catch (err) {
      alert(err.message || 'Failed to cancel listing');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>;
      case 'SOLD':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">Sold Out</span>;
      case 'UNDER_OFFER':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">In Negotiation</span>;
      case 'CANCELLED':
        return <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">Cancelled</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">{status}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/farmer" className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">My Crop Listings</h1>
            <p className="text-xs text-slate-500">Manage your active harvest and traceability batches</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {['ALL', 'ACTIVE', 'UNDER_OFFER', 'SOLD', 'CANCELLED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filter === tab
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab === 'ALL' ? 'All Crops' : tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
          {message}
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {listings.length === 0 ? (
          <div className="card-base p-8 text-center text-slate-400">
            <Sprout className="w-12 h-12 mx-auto mb-2 opacity-40 text-emerald-600" />
            <p className="text-sm font-semibold text-slate-600">No crop listings found in this category.</p>
            <Link to="/farmer" className="btn-primary text-xs mt-3">
              + Sell Crop
            </Link>
          </div>
        ) : (
          listings.map((crop) => (
            <div key={crop.id} className="card-base p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl flex-shrink-0">
                  🌾
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{crop.cropName}</h3>
                    {getStatusBadge(crop.status)}
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {crop.qualityGrade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Variety: {crop.variety} &bull; Qty: {crop.quantity} {crop.unit} &bull; Listed Price: ₹{crop.expectedPricePerUnit}/{crop.unit}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Location: {crop.farmLocation}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                {crop.batchCode && (
                  <Link
                    to={`/trace?batch=${crop.batchCode}`}
                    className="btn-outline text-xs py-1.5 px-2.5"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Trace QR</span>
                  </Link>
                )}

                {crop.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleCancel(crop.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Cancel Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
