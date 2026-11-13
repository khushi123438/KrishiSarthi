import api from './api';

export const adminService = {
  async getDashboard() {
    return api.get('/admin/dashboard');
  },

  async getUsers(role = null, kycStatus = null) {
    const params = {};
    if (role) params.role = role;
    if (kycStatus) params.kycStatus = kycStatus;
    return api.get('/admin/users', { params });
  },

  async updateUserStatus(userId, status, reason = '') {
    return api.put(`/admin/users/${userId}/status`, { status, reason });
  },

  async reviewKyc(userId, status, remarks = '') {
    return api.put(`/admin/users/${userId}/kyc`, { status, remarks });
  },

  async getAuditLogs(page = 0, size = 50) {
    return api.get('/admin/audit-logs', { params: { page, size } });
  }
};
