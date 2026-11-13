import React, { useState, useEffect } from 'react';
import { transporterService } from '../../services/transporterService';
import { Modal } from '../../components/Modal';
import {
  Truck,
  MapPin,
  CheckCircle2,
  Upload,
  Navigation,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status update modal state
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [newStatus, setNewStatus] = useState('IN_TRANSIT');
  const [currentLocText, setCurrentLocText] = useState('');
  const [currentLat, setCurrentLat] = useState('29.3909');
  const [currentLng, setCurrentLng] = useState('76.9635');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // POD modal state
  const [podModalOpen, setPodModalOpen] = useState(false);
  const [receiverName, setReceiverName] = useState('');
  const [podNotes, setPodNotes] = useState('');
  const [podFile, setPodFile] = useState(null);
  const [uploadingPod, setUploadingPod] = useState(false);

  const [alertMsg, setAlertMsg] = useState(null);

  const fetchShipments = async () => {
    try {
      const res = await transporterService.getMyShipments();
      setShipments(res.data || []);
    } catch (err) {
      console.error('Failed to load transporter shipments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const openStatusModal = (shipment) => {
    setSelectedShipment(shipment);
    setNewStatus(shipment.status || 'IN_TRANSIT');
    setCurrentLocText(shipment.currentLocation || 'Panipat Toll Plaza (NH-44)');
    setAlertMsg(null);
    setStatusModalOpen(true);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    setUpdatingStatus(true);
    setAlertMsg(null);

    try {
      await transporterService.updateShipmentStatus(selectedShipment.id, {
        status: newStatus,
        currentLocation: currentLocText,
        currentLatitude: parseFloat(currentLat),
        currentLongitude: parseFloat(currentLng),
        notes: `GPS Telemetry updated: ${currentLocText}`,
      });
      setAlertMsg({ type: 'success', text: `Trip #${selectedShipment.id} status updated to ${newStatus}!` });
      setStatusModalOpen(false);
      fetchShipments();
    } catch (err) {
      setAlertMsg({ type: 'error', text: err.message || 'Failed to update trip status.' });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const openPodModal = (shipment) => {
    setSelectedShipment(shipment);
    setReceiverName('');
    setPodNotes('');
    setPodFile(null);
    setAlertMsg(null);
    setPodModalOpen(true);
  };

  const handlePodSubmit = async (e) => {
    e.preventDefault();
    setUploadingPod(true);
    setAlertMsg(null);

    const formData = new FormData();
    formData.append('receiverName', receiverName);
    formData.append('notes', podNotes);
    if (podFile) {
      formData.append('proofImage', podFile);
    }

    try {
      await transporterService.submitDeliveryProof(selectedShipment.id, formData);
      setAlertMsg({ type: 'success', text: 'Proof of Delivery (POD) uploaded and verified! Escrow payout unlocked.' });
      setPodModalOpen(false);
      fetchShipments();
    } catch (err) {
      setAlertMsg({ type: 'error', text: err.message || 'Failed to upload Proof of Delivery.' });
    } finally {
      setUploadingPod(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PICKED_UP':
        return <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Picked Up (Loaded)</span>;
      case 'IN_TRANSIT':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">In Transit (On Route)</span>;
      case 'ARRIVED':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Arrived at Mandi</span>;
      case 'DELIVERED':
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold">Delivered & Verified</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-0.5 rounded-full font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">Assigned Trips & Shipments</h1>
        <p className="text-xs text-slate-500">Update live GPS milestones and submit delivery receipts</p>
      </div>

      {alertMsg && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            alertMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {alertMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{alertMsg.text}</span>
        </div>
      )}

      {/* Trips list */}
      <div className="space-y-4">
        {(shipments.length > 0 ? shipments : [
          {
            id: 1,
            shipmentCode: 'TRIP-2026-001',
            vehicleNumber: 'HR-05-AB-1234',
            vehicleType: '10_TYRE_TRUCK',
            pickupLocation: 'Village Taraori, Karnal, Haryana',
            destinationLocation: 'Azadpur Mandi Gate 2, Delhi',
            status: 'IN_TRANSIT',
            currentLocation: 'Panipat Toll Plaza (NH-44)',
            agreedFreightAmount: 12500,
            hasProofOfDelivery: false,
          }
        ]).map((trip) => (
          <div key={trip.id} className="card-base p-5 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-base">
                    Trip #{trip.id} &bull; {trip.vehicleNumber}
                  </span>
                  {getStatusBadge(trip.status)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Shipment Code: <span className="font-mono font-bold text-slate-700">{trip.shipmentCode || 'TRIP-2026-001'}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Agreed Freight</span>
                <span className="text-lg font-black text-emerald-800">
                  ₹{trip.agreedFreightAmount?.toLocaleString('en-IN') || '12,500'}
                </span>
              </div>
            </div>

            {/* Current Telemetry */}
            <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-700 animate-pulse" />
                <div>
                  <span className="text-[10px] text-amber-800 uppercase font-bold block">Current Location</span>
                  <span className="font-bold text-slate-900">{trip.currentLocation || 'En Route'}</span>
                </div>
              </div>
              <span className="text-[11px] text-amber-900 font-semibold bg-white/80 px-2 py-0.5 rounded border border-amber-200">
                GPS Active
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => openStatusModal(trip)}
                className="btn-outline text-xs py-2 px-3.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Update GPS & Status</span>
              </button>

              {trip.status !== 'DELIVERED' ? (
                <button
                  onClick={() => openPodModal(trip)}
                  className="btn-primary text-xs py-2 px-3.5 shadow-sm bg-emerald-700 hover:bg-emerald-800"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Delivery Proof (POD)</span>
                </button>
              ) : (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>POD Confirmed</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Status Update Modal */}
      <Modal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        title="Update Trip GPS & Milestone"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleStatusSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Trip Milestone Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:bg-white focus:ring-2 focus:ring-amber-500"
            >
              <option value="PICKED_UP">PICKED_UP – Cargo loaded at farm</option>
              <option value="IN_TRANSIT">IN_TRANSIT – En route on highway</option>
              <option value="ARRIVED">ARRIVED – Arrived at destination mandi</option>
              <option value="DELIVERED">DELIVERED – Unloaded & handed over</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Current Landmark / Toll / City *</label>
            <input
              type="text"
              required
              value={currentLocText}
              onChange={(e) => setCurrentLocText(e.target.value)}
              placeholder="e.g. Panipat Toll Plaza (NH-44)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Latitude</label>
              <input
                type="text"
                value={currentLat}
                onChange={(e) => setCurrentLat(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Longitude</label>
              <input
                type="text"
                value={currentLng}
                onChange={(e) => setCurrentLng(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={updatingStatus}
            className="w-full btn-primary py-2.5 text-xs font-bold shadow-md bg-amber-600 hover:bg-amber-700 mt-2"
          >
            {updatingStatus ? 'Broadcasting Location...' : 'Broadcast GPS Location'}
          </button>
        </form>
      </Modal>

      {/* Proof of Delivery (POD) Modal */}
      <Modal
        isOpen={podModalOpen}
        onClose={() => setPodModalOpen(false)}
        title="Submit Proof of Delivery (POD)"
        maxWidth="max-w-md"
      >
        <form onSubmit={handlePodSubmit} className="space-y-3.5">
          <p className="text-xs text-slate-600">
            Uploading delivery proof validates cargo handover, records the final milestone in the traceability blockchain timeline, and releases escrow funds to the farmer.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Receiver Name / Warehouse In-Charge *</label>
            <input
              type="text"
              required
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="e.g. Rajiv Malhotra (Warehouse Manager)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Signed Delivery Receipt Photo *</label>
            <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 text-xs text-slate-500">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>{podFile ? podFile.name : 'Upload photo of signed receipt/challan'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPodFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Remarks (Optional)</label>
            <textarea
              rows={2}
              value={podNotes}
              onChange={(e) => setPodNotes(e.target.value)}
              placeholder="e.g. 50 bags inspected and verified without damage"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={uploadingPod}
            className="w-full btn-primary py-2.5 text-xs font-bold shadow-md bg-emerald-700 hover:bg-emerald-800"
          >
            {uploadingPod ? 'Verifying POD...' : 'Confirm Delivery & Handover'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
