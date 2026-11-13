import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buyerService } from '../../services/buyerService';
import { Modal } from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';
import {
  ShoppingBag,
  Search,
  Filter,
  MapPin,
  QrCode,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Tag
} from 'lucide-react';

export const Marketplace = () => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');

  // Make Offer Modal State
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offeredPrice, setOfferedPrice] = useState('');
  const [offeredQuantity, setOfferedQuantity] = useState('');
  const [deliveryPref, setDeliveryPref] = useState('BUYER_WAREHOUSE');
  const [notes, setNotes] = useState('');
  const [submittingOffer, setSubmittingOffer] = useState(false);
  const [offerSuccess, setOfferSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchCrops = async () => {
    try {
      const res = await buyerService.getMarketplace({
        cropName: searchQuery || undefined,
        qualityGrade: gradeFilter || undefined,
      });
      setCrops(res.data || []);
    } catch (err) {
      console.error('Failed to load marketplace crops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [gradeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCrops();
  };

  const openMakeOffer = (crop) => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setSelectedCrop(crop);
    setOfferedPrice(crop.expectedPricePerUnit);
    setOfferedQuantity(crop.quantity);
    setOfferSuccess(false);
    setErrorMsg(null);
    setOfferModalOpen(true);
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    setSubmittingOffer(true);
    setErrorMsg(null);

    try {
      await buyerService.makeOffer({
        cropListingId: selectedCrop.id,
        offeredPricePerUnit: parseFloat(offeredPrice),
        quantity: parseFloat(offeredQuantity),
        deliveryPreference: deliveryPref,
        notes,
      });
      setOfferSuccess(true);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit offer. Please try again.');
    } finally {
      setSubmittingOffer(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-12 space-y-5">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-6 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs bg-emerald-700/80 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
            Agricultural Marketplace
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
            Direct Farm Produce Sourcing
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-xl">
            Source 100% verified harvests directly from farmers with transparent pricing, full batch QR traceability, and escrow protection.
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="card-base p-4 flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by crop name (e.g. Wheat, Basmati Rice, Mustard, Potato)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </form>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Grade:</span>
          </div>
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Grades</option>
            <option value="GRADE_A">Grade A (Premium)</option>
            <option value="GRADE_B">Grade B (Standard)</option>
            <option value="GRADE_C">Grade C (Fair)</option>
          </select>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(crops.length > 0 ? crops : [
          {
            id: 1,
            cropName: 'Wheat (Sharbati)',
            variety: 'C-306 Gold',
            quantity: 50.0,
            unit: 'QUINTAL',
            expectedPricePerUnit: 2450.0,
            qualityGrade: 'GRADE_A',
            batchCode: 'KB-2026-WHT-001',
            farmLocation: 'Karnal, Haryana',
            farmerName: 'Ramesh Kumar',
          },
          {
            id: 2,
            cropName: 'Basmati Rice',
            variety: 'Pusa 1121 Premium',
            quantity: 30.0,
            unit: 'QUINTAL',
            expectedPricePerUnit: 3850.0,
            qualityGrade: 'GRADE_A',
            batchCode: 'KB-2026-RIC-002',
            farmLocation: 'Amritsar, Punjab',
            farmerName: 'Sunita Devi',
          },
          {
            id: 3,
            cropName: 'Mustard (Sarson)',
            variety: 'Pusa Bold',
            quantity: 40.0,
            unit: 'QUINTAL',
            expectedPricePerUnit: 5400.0,
            qualityGrade: 'GRADE_B',
            batchCode: 'KB-2026-MUS-003',
            farmLocation: 'Alwar, Rajasthan',
            farmerName: 'Ramesh Kumar',
          }
        ]).map((crop) => (
          <div key={crop.id} className="card-base p-4 flex flex-col justify-between group">
            <div>
              {/* Top Meta */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                  {crop.qualityGrade}
                </span>
                {crop.batchCode && (
                  <Link
                    to={`/trace?batch=${crop.batchCode}`}
                    className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 hover:bg-emerald-100"
                  >
                    <QrCode className="w-3 h-3" />
                    <span>{crop.batchCode}</span>
                  </Link>
                )}
              </div>

              {/* Title & Variety */}
              <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                {crop.cropName}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Variety: {crop.variety}
              </p>

              {/* Farmer and Location */}
              <div className="mt-2 text-xs text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{crop.farmLocation}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Farmer: <span className="font-medium text-slate-700">{crop.farmerName || 'Verified Farmer'}</span>
              </p>

              {/* Quantity */}
              <div className="mt-3 p-2 bg-slate-50 rounded-lg flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Available Volume:</span>
                <span className="font-extrabold text-slate-800">{crop.quantity} {crop.unit}</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Listed Rate</span>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-lg font-black text-emerald-800">₹{crop.expectedPricePerUnit}</span>
                  <span className="text-[10px] text-slate-500">/{crop.unit}</span>
                </div>
              </div>

              <button
                onClick={() => openMakeOffer(crop)}
                className="btn-primary text-xs py-2 px-3.5 shadow-sm"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Make Offer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Make Offer Modal */}
      <Modal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        title={`Make Price Offer for ${selectedCrop?.cropName || 'Crop'}`}
        maxWidth="max-w-md"
      >
        {offerSuccess ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Offer Sent to Farmer!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              The farmer will review your proposed rate of ₹{offeredPrice}/{selectedCrop?.unit} for {offeredQuantity} {selectedCrop?.unit}.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <Link to="/buyer/orders" className="btn-primary text-xs">
                View My Orders & Offers
              </Link>
              <button
                onClick={() => setOfferModalOpen(false)}
                className="btn-outline text-xs"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleOfferSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs font-semibold text-red-700 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Crop:</span>
                <span className="font-bold text-slate-800">{selectedCrop?.cropName} ({selectedCrop?.variety})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Farmer Listed Price:</span>
                <span className="font-bold text-emerald-700">₹{selectedCrop?.expectedPricePerUnit} / {selectedCrop?.unit}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Price (₹ per {selectedCrop?.unit}) *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quantity ({selectedCrop?.unit}) *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={offeredQuantity}
                  onChange={(e) => setOfferedQuantity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-lg flex justify-between items-center text-xs">
              <span className="font-semibold text-emerald-900">Total Proposed Value:</span>
              <span className="text-base font-black text-emerald-800">
                ₹{((parseFloat(offeredPrice) || 0) * (parseFloat(offeredQuantity) || 0)).toLocaleString('en-IN')}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Preference</label>
              <select
                value={deliveryPref}
                onChange={(e) => setDeliveryPref(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="BUYER_WAREHOUSE">Deliver to Buyer Warehouse</option>
                <option value="FARM_GATE_PICKUP">Direct Farm Gate Pickup</option>
                <option value="MANDI_HUB">Deliver to Nearest Mandi Hub</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Instructions (Optional)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Need delivery within 3 days, moisture content must be below 12%"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={submittingOffer}
              className="w-full btn-primary py-2.5 text-xs font-bold shadow-md"
            >
              {submittingOffer ? 'Submitting Offer...' : 'Send Offer to Farmer'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};
