import api from './api';

export const notificationService = {
  async getNotifications() {
    return api.get('/notifications');
  },

  async markAsRead(id) {
    return api.put(`/notifications/${id}/read`);
  }
};
