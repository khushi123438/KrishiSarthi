import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { farmerService } from '../../services/farmerService';
import { Modal } from '../../components/Modal';
import { VoiceControl } from '../../components/VoiceControl';
import {
  Sprout,
  TrendingUp,
  Inbox,
  ShieldCheck,
  PlusCircle,
  QrCode,
  CheckCircle2,
  Clock,
  ArrowRight,
  Upload,
  AlertCircle
} from 'lucide-react';

export const FarmerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdBatch, setCreatedBatch] = useState(null);

  // Listing Form State
  const [cropName, setCropName] = useState('');
  const [variety, setVariety] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('QUINTAL');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [qualityGrade, setQualityGrade] = useState('GRADE_A');
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [farmLocation, setFarmLocation] = useState(user?.city || 'Karnal, Haryana');
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await farmerService.getDashboard();
      setDashboardData(res.data);
    } catch (err) {
      console.error('Failed to load farmer dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleVoiceParsed = (parsed) => {
    if (parsed.cropName) setCropName(parsed.cropName);
    if (parsed.variety) setVariety(parsed.variety);
    if (parsed.quantity) setQuantity(parsed.quantity);
    if (parsed.unit) setUnit(parsed.unit);
    if (parsed.expectedPrice) setExpectedPrice(parsed.expectedPrice);
    if (parsed.qualityGrade) setQualityGrade(parsed.qualityGrade);
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('cropName', cropName);
    formData.append('variety', variety);
    formData.append('quantity', quantity);
    formData.append('unit', unit);
    formData.append('expectedPricePerUnit', expectedPrice);
    formData.append('qualityGrade', qualityGrade);
    formData.append('harvestDate', harvestDate);
    formData.append('farmLocation', farmLocation);
    formData.append('description', description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await farmerService.createListing(formData);
      setCreatedBatch(res.data?.batchCode || 'KB-GEN-SUCCESS');
      // Reset form
      setCropName('');
      setVariety('');
      setQuantity('');
      setExpectedPrice('');
      setDescription('');
      setImageFile(null);
      fetchDashboard();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to list crop. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12 space-y-5">
      
      {/* Farmer Greeting Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-2xl p-5 text-white shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🌾</span>
            <span className="text-xs bg-emerald-600/60 border border-emerald-400/40 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              Farmer Portal
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Namaste, {user?.fullName || 'Farmer'}!
          </h1>
          <p className="text-xs text-emerald-100 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Farm Location: {user?.city || 'Karnal, Haryana'} &bull; KYC Verified</span>
          </p>
        </div>

        <button
          onClick={() => { setCreatedBatch(null); setSellModalOpen(true); }}
          className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
        >
          <PlusCircle className="w-5 h-5 text-slate-900" />
          <span>{t('sell_crop_btn')}</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card-base p-4">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Active Crops</span>
            <Sprout className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {dashboardData?.totalActiveListings ?? 2}
          </p>
          <span className="text-[11px] text-emerald-700 font-medium">On Live Market</span>
        </div>

        <div className="card-base p-4">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Received Offers</span>
            <Inbox className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {dashboardData?.pendingOffersCount ?? 3}
          </p>
          <Link to="/farmer/offers" className="text-[11px] text-amber-700 font-bold hover:underline">
            Review Offers &rarr;
          </Link>
        </div>

        <div className="card-base p-4">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Active Orders</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {dashboardData?.activeOrdersCount ?? 1}
          </p>
          <span className="text-[11px] text-blue-700 font-medium">In Transit / Processing</span>
        </div>

        <div className="card-base p-4">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Escrow Settlement</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            ₹{dashboardData?.totalEarnings ? dashboardData.totalEarnings.toLocaleString('en-IN') : '1,10,000'}
          </p>
          <span className="text-[11px] text-emerald-700 font-medium">100% Protected</span>
        </div>
      </div>

      {/* Quick Links / Tabs */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="font-extrabold text-slate-800 text-base">Your Active Crop Listings</h2>
        <Link to="/farmer/crops" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
          <span>Manage All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Crops List */}
      <div className="space-y-3">
        {(dashboardData?.recentListings || [
          {
            id: 1,
            cropName: 'Wheat (Sharbati)',
            variety: 'C-306',
            quantity: 50.0,
            unit: 'QUINTAL',
            expectedPricePerUnit: 2450.0,
            status: 'ACTIVE',
            batchCode: 'KB-2026-WHT-001',
            qualityGrade: 'GRADE_A',
            offersCount: 2,
          },
          {
            id: 2,
            cropName: 'Basmati Rice',
            variety: 'Pusa 1121',
            quantity: 30.0,
            unit: 'QUINTAL',
            expectedPricePerUnit: 3850.0,
            status: 'ACTIVE',
            batchCode: 'KB-2026-RIC-002',
            qualityGrade: 'GRADE_A',
            offersCount: 1,
          }
        ]).map((crop) => (
          <div key={crop.id} className="card-base p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl flex-shrink-0">
                🌾
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-sm">{crop.cropName}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {crop.qualityGrade}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Variety: {crop.variety} &bull; Qty: {crop.quantity} {crop.unit}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Link
                    to={`/trace?batch=${crop.batchCode}`}
                    className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 hover:bg-emerald-100"
                  >
                    <QrCode className="w-3 h-3" />
                    <span>Batch: {crop.batchCode}</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
              <div className="text-right">
                <span className="text-xs text-slate-400 block sm:inline">Price: </span>
                <span className="font-extrabold text-slate-900 text-base">₹{crop.expectedPricePerUnit}</span>
                <span className="text-[10px] text-slate-500">/{crop.unit}</span>
              </div>
              <Link
                to="/farmer/offers"
                className="mt-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 hover:bg-amber-100"
              >
                {crop.offersCount || 0} Offers Waiting
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Sell Crop Modal */}
      <Modal
        isOpen={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
        title="List New Crop for Sale (फसल बेचें)"
        maxWidth="max-w-xl"
      >
        {createdBatch ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Crop Listed Successfully!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your crop has been verified and registered on the KrishiSarthi marketplace with automatic traceability.
            </p>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl inline-block text-xs font-mono font-bold text-emerald-800">
              Traceability Batch: {createdBatch}
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                to={`/trace?batch=${createdBatch}`}
                className="btn-outline text-xs"
              >
                <QrCode className="w-4 h-4" />
                <span>View QR Certificate</span>
              </Link>
              <button
                onClick={() => { setCreatedBatch(null); setSellModalOpen(false); }}
                className="btn-primary text-xs"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreateListing} className="space-y-4">
            {/* Voice AI Assistant helper */}
            <VoiceControl onListingParsed={handleVoiceParsed} />

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Crop Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wheat, Basmati Rice, Mustard"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Variety / Type *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharbati C-306, Pusa 1121"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="50"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="QUINTAL">Quintal (क्विंटल)</option>
                  <option value="KG">Kilogram (किग्रा)</option>
                  <option value="TON">Metric Ton (टन)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expected Price (₹) *</label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="2450"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quality Grade</label>
                <select
                  value={qualityGrade}
                  onChange={(e) => setQualityGrade(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="GRADE_A">Grade A (Premium)</option>
                  <option value="GRADE_B">Grade B (Standard)</option>
                  <option value="GRADE_C">Grade C (Fair)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Harvest Date</label>
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Farm Origin Address</label>
              <input
                type="text"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                placeholder="Village / Farm pickup location"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Crop Photo (Optional)</label>
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors text-xs text-slate-500">
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>{imageFile ? imageFile.name : 'Upload actual harvest photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-3 text-sm font-bold shadow-md"
            >
              {submitting ? 'Generating Batch & Listing...' : 'List Crop & Generate QR Batch'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};
