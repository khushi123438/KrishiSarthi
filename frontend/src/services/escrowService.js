import api from './api';

export const escrowService = {
  async getEscrowDetails(orderId) {
    return api.get(`/escrow/order/${orderId}`);
  },

  async releasePayout(orderId, payoutData) {
    // payoutData: { bankAccountNumber, ifscCode, upiId, remarks }
    return api.post(`/escrow/release/${orderId}`, payoutData);
  }
};
