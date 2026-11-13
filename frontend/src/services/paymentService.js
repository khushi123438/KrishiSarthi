import api from './api';

export const paymentService = {
  async createPaymentOrder(orderId, paymentMethod = 'RAZORPAY') {
    return api.post('/payment/create-order', { orderId, paymentMethod });
  },

  async verifyPayment(verificationData) {
    // verificationData: { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId }
    return api.post('/payment/verify', verificationData);
  },

  async getOrderPaymentStatus(orderId) {
    return api.get(`/payment/status/${orderId}`);
  }
};
