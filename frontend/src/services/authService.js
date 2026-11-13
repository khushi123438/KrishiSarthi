import api from './api';

export const authService = {
  async login(loginOrPhone, password) {
    const res = await api.post('/auth/login', { loginOrPhone, password });
    if (res.data?.token) {
      localStorage.setItem('krishi_token', res.data.token);
      localStorage.setItem('krishi_user', JSON.stringify(res.data));
    }
    return res.data;
  },

  async register(registrationData) {
    const res = await api.post('/auth/register', registrationData);
    if (res.data?.token) {
      localStorage.setItem('krishi_token', res.data.token);
      localStorage.setItem('krishi_user', JSON.stringify(res.data));
    }
    return res.data;
  },

  async sendOtp(phoneNumber, purpose = 'REGISTRATION') {
    return api.post('/auth/send-otp', { phoneNumber, purpose });
  },

  async verifyOtp(phoneNumber, otp, purpose = 'REGISTRATION') {
    return api.post('/auth/verify-otp', { phoneNumber, otp, purpose });
  },

  async getMe() {
    return api.get('/auth/me');
  },

  logout() {
    localStorage.removeItem('krishi_token');
    localStorage.removeItem('krishi_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('krishi_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('krishi_token');
  }
};
