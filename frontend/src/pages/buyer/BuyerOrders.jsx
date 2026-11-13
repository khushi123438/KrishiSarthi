import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buyerService } from '../../services/buyerService';
import { paymentService } from '../../services/paymentService';
import { LiveGpsMap } from '../../components/LiveGpsMap';
import { EscrowCard } from '../../components/EscrowCard';
import {
  ShoppingBag,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  QrCode,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingOrderId, setPayingOrderId] = useState(null);
  const [paymentMsg, setPaymentMsg] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await buyerService.getMyOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePayNow = async (order) => {
    setPayingOrderId(order.id);
    setPaymentMsg(null);

    try {
      // 1. Create Razorpay order on backend
      const res = await paymentService.createPaymentOrder(order.id, 'RAZORPAY');
      const paymentOrderData = res.data;

      // Check if Razorpay JS SDK is loaded
      if (typeof window.Razorpay === 'function' && paymentOrderData.keyId) {
        const options = {
          key: paymentOrderData.keyId,
          amount: Math.round(paymentOrderData.amount * 100),
          currency: paymentOrderData.currency || 'INR',
          name: 'KrishiSarthi Agricultural Grid',
          description: `Crop Purchase: Order #${order.id}`,
          order_id: paymentOrderData.razorpayOrderId,
          handler: async (response) => {
            try {
              // 2. Verify payment HMAC signature on Spring Boot backend
              await paymentService.verifyPayment({
                orderId: order.id,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
              setPaymentMsg({
                type: 'success',
                text: 'Payment successful! Funds secured in Escrow and Transport Request created.'
              });
              fetchOrders();
            } catch (err) {
              setPaymentMsg({ type: 'error', text: err.message || 'Signature verification failed.' });
            }
          },
          theme: { color: '#059669' },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback Test / Demo simulation mode
        const mockPaymentId = `pay_mock_${Date.now()}`;
        await paymentService.verifyPayment({
          orderId: order.id,
          razorpayOrderId: paymentOrderData.razorpayOrderId || `order_mock_${Date.now()}`,
          razorpayPaymentId: mockPaymentId,
          razorpaySignature: 'mock_signature_verified',
        });
        setPaymentMsg({
          type: 'success',
          text: `Payment simulated successfully! (Ref: ${mockPaymentId}). Secured in KrishiSarthi Escrow.`
        });
        fetchOrders();
      }
    } catch (err) {
      setPaymentMsg({ type: 'error', text: err.message || 'Payment initiation failed.' });
    } finally {
      setPayingOrderId(null);
    }
  };

  const getOrderStatusBadge = (status) => {
    switch (status) {
      case 'PENDING_PAYMENT':
      case 'PENDING':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Awaiting Payment</span>;
      case 'PAID':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Paid & Escrow Held</span>;
      case 'IN_TRANSIT':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">In Transit</span>;
      case 'DELIVERED':
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Delivered</span>;
      case 'COMPLETED':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Completed & Settled</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-12 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">My Orders & Shipments</h1>
        <p className="text-xs text-slate-500">Track payments, active transport GPS, and escrow settlement status</p>
      </div>

      {paymentMsg && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            paymentMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {paymentMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{paymentMsg.text}</span>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-5">
        {(orders.length > 0 ? orders : [
          {
            id: 1,
            cropName: 'Wheat (Sharbati C-306)',
            quantity: 50.0,
            unit: 'QUINTAL',
            agreedPricePerUnit: 2450.0,
            totalAmount: 122500.0,
            status: 'IN_TRANSIT',
            farmerName: 'Ramesh Kumar',
            batchCode: 'KB-2026-WHT-001',
            createdAt: new Date().toISOString(),
            escrow: {
              status: 'HELD',
              totalHeldAmount: 122500,
              platformFee: 2450,
              farmerPayoutAmount: 120050,
            },
            shipment: {
              vehicleNumber: 'HR-05-AB-1234',
              currentLocation: 'Panipat Toll Plaza (NH-44)',
              status: 'IN_TRANSIT',
              currentLat: 29.3909,
              currentLng: 76.9635,
            }
          }
        ]).map((order) => (
          <div key={order.id} className="card-base p-5 space-y-4">
            
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-base">
                    Order #{order.id} &bull; {order.cropName}
                  </span>
                  {getOrderStatusBadge(order.status)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Farmer: <span className="font-semibold text-slate-700">{order.farmerName}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Total Amount</span>
                <span className="text-lg font-black text-emerald-800">
                  ₹{order.totalAmount ? order.totalAmount.toLocaleString('en-IN') : '0'}
                </span>
              </div>
            </div>

            {/* Batch & Price Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Quantity</span>
                <span className="font-bold text-slate-800">{order.quantity} {order.unit || 'QUINTAL'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Agreed Rate</span>
                <span className="font-bold text-slate-800">₹{order.agreedPricePerUnit} / {order.unit || 'QUINTAL'}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 block">Traceability Batch</span>
                {order.batchCode ? (
                  <Link
                    to={`/trace?batch=${order.batchCode}`}
                    className="font-bold text-emerald-700 flex items-center gap-1 hover:underline"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{order.batchCode}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                ) : (
                  <span className="text-slate-400">Not Assigned</span>
                )}
              </div>
            </div>

            {/* Pay Now Button if payment is pending */}
            {(order.status === 'PENDING_PAYMENT' || order.status === 'PENDING') && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-700" />
                    <span>Payment Required to Initiate Transport</span>
                  </h4>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Funds will be held securely in KrishiSarthi Escrow until delivery is confirmed.
                  </p>
                </div>
                <button
                  onClick={() => handlePayNow(order)}
                  disabled={payingOrderId === order.id}
                  className="btn-primary text-xs py-2 px-4 shadow-sm whitespace-nowrap bg-emerald-700 hover:bg-emerald-800"
                >
                  {payingOrderId === order.id ? 'Processing Payment...' : 'Pay ₹' + order.totalAmount?.toLocaleString('en-IN') + ' via Razorpay'}
                </button>
              </div>
            )}

            {/* Live GPS Telemetry for In-Transit Shipments */}
            {order.status === 'IN_TRANSIT' && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Real-time GPS Route Visualization</span>
                </h4>
                <LiveGpsMap
                  pickupLocation={order.pickupAddress || 'Karnal Farm, Haryana'}
                  destinationLocation={order.destinationAddress || 'Azadpur Mandi, Delhi'}
                  currentLocation={order.shipment?.currentLocation || 'Panipat Toll Plaza (NH-44)'}
                  currentLat={order.shipment?.currentLat || 29.3909}
                  currentLng={order.shipment?.currentLng || 76.9635}
                  status="IN_TRANSIT"
                  vehicleNumber={order.shipment?.vehicleNumber || 'HR-05-AB-1234'}
                />
              </div>
            )}

            {/* Escrow Status Breakdown */}
            <EscrowCard
              escrow={order.escrow}
              orderId={order.id}
              isBuyer={true}
              onPayoutSuccess={fetchOrders}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
