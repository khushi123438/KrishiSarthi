import api from './api';

export const kycService = {
  // Admin review KYC
  async reviewKyc(userId, status, remarks = '') {
    return api.put(`/admin/users/${userId}/kyc`, { status, remarks });
  },

  // Get current user KYC details
  async getMyKycStatus() {
    return api.get('/auth/me');
  }
};
