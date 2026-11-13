import React, { useState, useEffect } from 'react';
import { transporterService } from '../../services/transporterService';
import { Modal } from '../../components/Modal';
import {
  Truck,
  MapPin,
  Calendar,
  Weight,
  Send,
  PlusCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const FreightMarketplace = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bidding modal state
  const [selectedReq, setSelectedReq] = useState(null);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [vehicleType, setVehicleType] = useState('10_TYRE_TRUCK');
  const [deliveryHours, setDeliveryHours] = useState('24');
  const [bidNotes, setBidNotes] = useState('');
  const [submittingBid, setSubmittingBid] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(false);

  // Direct Booking modal state
  const [directModalOpen, setDirectModalOpen] = useState(false);
  const [directPickup, setDirectPickup] = useState('');
  const [directDest, setDirectDest] = useState('');
  const [directWeight, setDirectWeight] = useState('');
  const [directCost, setDirectCost] = useState('');
  const [directSubmitting, setDirectSubmitting] = useState(false);

  const [alertMsg, setAlertMsg] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await transporterService.getOpenRequests();
      setRequests(res.data || []);
    } catch (err) {
      console.error('Failed to load freight requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const openBidModal = (req) => {
    setSelectedReq(req);
    setBidAmount(req.suggestedFreightBudget || '12000');
    setBidSuccess(false);
    setAlertMsg(null);
    setBidModalOpen(true);
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setSubmittingBid(true);
    setAlertMsg(null);

    try {
      await transporterService.submitBid(selectedReq.id, {
        bidAmount: parseFloat(bidAmount),
        vehicleType,
        estimatedDeliveryHours: parseInt(deliveryHours, 10),
        notes: bidNotes,
      });
      setBidSuccess(true);
      fetchRequests();
    } catch (err) {
      setAlertMsg({ type: 'error', text: err.message || 'Failed to submit freight bid.' });
    } finally {
      setSubmittingBid(false);
    }
  };

  const handleDirectBookingSubmit = async (e) => {
    e.preventDefault();
    setDirectSubmitting(true);
    setAlertMsg(null);

    try {
      await transporterService.createDirectBooking({
        pickupAddress: directPickup,
        destinationAddress: directDest,
        cargoDescription: 'Agricultural Produce',
        weightKg: parseFloat(directWeight) * 100, // quintal to kg
        agreedFreightCost: parseFloat(directCost),
      });
      setAlertMsg({ type: 'success', text: 'Direct freight booking initiated successfully!' });
      setDirectModalOpen(false);
      // Reset form
      setDirectPickup('');
      setDirectDest('');
      setDirectWeight('');
      setDirectCost('');
    } catch (err) {
      setAlertMsg({ type: 'error', text: err.message || 'Failed to create direct booking.' });
    } finally {
      setDirectSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12 space-y-5">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-600 rounded-2xl p-6 text-white shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs bg-amber-800/80 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
            Transporter Logistics Hub
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
            Agricultural Freight Loads
          </h1>
          <p className="text-xs text-amber-100 mt-1">
            Bid on active farm-to-mandi cargo requests or register direct transport assignments.
          </p>
        </div>

        <button
          onClick={() => setDirectModalOpen(true)}
          className="bg-white hover:bg-amber-50 text-amber-900 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4 text-amber-700" />
          <span>Direct Booking</span>
        </button>
      </div>

      {alertMsg && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            alertMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {alertMsg.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{alertMsg.text}</span>
        </div>
      )}

      {/* Requests Feed */}
      <div className="space-y-4">
        {(requests.length > 0 ? requests : [
          {
            id: 1,
            pickupLocation: 'Village Taraori, Karnal, Haryana',
            destinationLocation: 'Azadpur Mandi Gate 2, Delhi',
            cropDescription: '50 Quintals Wheat (Sharbati C-306)',
            weightKg: 5000,
            suggestedFreightBudget: 12500,
            status: 'OPEN',
            bidsCount: 2,
          },
          {
            id: 2,
            pickupLocation: 'Amritsar Farm Hub, Punjab',
            destinationLocation: 'Lawrence Road Mandi, Delhi',
            cropDescription: '30 Quintals Basmati Rice (Pusa 1121)',
            weightKg: 3000,
            suggestedFreightBudget: 16000,
            status: 'OPEN',
            bidsCount: 1,
          }
        ]).map((req) => (
          <div key={req.id} className="card-base p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  Request #{req.id} &bull; Open for Bidding
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-1">
                  {req.cropDescription}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Indicative Budget</span>
                <span className="text-lg font-black text-emerald-800">
                  ₹{req.suggestedFreightBudget?.toLocaleString('en-IN') || 'Negotiable'}
                </span>
              </div>
            </div>

            {/* Route */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Pickup (Origin)</span>
                  <span className="font-semibold text-slate-800">{req.pickupLocation}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Drop-off (Destination)</span>
                  <span className="font-semibold text-slate-800">{req.destinationLocation}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-xs text-slate-500 font-medium">
                Weight: <span className="font-bold text-slate-800">{req.weightKg ? req.weightKg / 100 : 50} Quintals</span> &bull; {req.bidsCount || 0} Bids Placed
              </div>

              <button
                onClick={() => openBidModal(req)}
                className="btn-primary text-xs py-2 px-4 shadow-sm bg-amber-600 hover:bg-amber-700"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Freight Bid</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bid Modal */}
      <Modal
        isOpen={bidModalOpen}
        onClose={() => setBidModalOpen(false)}
        title="Submit Freight Bid"
        maxWidth="max-w-md"
      >
        {bidSuccess ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Bid Placed Successfully!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              The buyer/farmer will review your bid of ₹{bidAmount} with {deliveryHours}h estimated transit.
            </p>
            <button
              onClick={() => setBidModalOpen(false)}
              className="btn-primary text-xs mt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBidSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Total Freight Quote (₹) *
              </label>
              <input
                type="number"
                required
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-amber-500"
                >
                  <option value="10_TYRE_TRUCK">10-Tyre Heavy Truck (16T)</option>
                  <option value="6_TYRE_TRUCK">6-Tyre Standard Truck (9T)</option>
                  <option value="MINI_TRUCK">Mini Truck (Tata Ace / Pickup)</option>
                  <option value="MULTI_AXLE">Multi-Axle Trailer (25T+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Transit Time (Hours)</label>
                <input
                  type="number"
                  required
                  value={deliveryHours}
                  onChange={(e) => setDeliveryHours(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Driver Notes / Terms</label>
              <textarea
                rows={2}
                value={bidNotes}
                onChange={(e) => setBidNotes(e.target.value)}
                placeholder="e.g. Tarpaulin cover included, available for immediate loading"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={submittingBid}
              className="w-full btn-primary py-2.5 text-xs font-bold shadow-md bg-amber-600 hover:bg-amber-700"
            >
              {submittingBid ? 'Submitting Bid...' : 'Confirm and Place Bid'}
            </button>
          </form>
        )}
      </Modal>

      {/* Direct Booking Modal */}
      <Modal
        isOpen={directModalOpen}
        onClose={() => setDirectModalOpen(false)}
        title="Direct Transport Assignment"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleDirectBookingSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Address (Farm)</label>
            <input
              type="text"
              required
              placeholder="e.g. Farm Gate, Karnal"
              value={directPickup}
              onChange={(e) => setDirectPickup(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Destination Address (Mandi / Warehouse)</label>
            <input
              type="text"
              required
              placeholder="e.g. Azadpur Mandi, Delhi"
              value={directDest}
              onChange={(e) => setDirectDest(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cargo Weight (Quintals)</label>
              <input
                type="number"
                required
                value={directWeight}
                onChange={(e) => setDirectWeight(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Agreed Freight (₹)</label>
              <input
                type="number"
                required
                value={directCost}
                onChange={(e) => setDirectCost(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={directSubmitting}
            className="w-full btn-primary py-2.5 text-xs font-bold shadow-md bg-amber-600 hover:bg-amber-700 mt-2"
          >
            {directSubmitting ? 'Creating Assignment...' : 'Generate Trip Assignment'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
