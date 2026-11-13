import api from './api';

export const farmerService = {
  async getDashboard() {
    return api.get('/farmer/dashboard');
  },

  async getMyListings(status = null) {
    const params = status ? { status } : {};
    return api.get('/farmer/listings', { params });
  },

  async createListing(formData) {
    return api.post('/farmer/listings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async updateListing(id, data) {
    return api.put(`/farmer/listings/${id}`, data);
  },

  async cancelListing(id) {
    return api.delete(`/farmer/listings/${id}`);
  },

  async getOffers(listingId = null) {
    const params = listingId ? { listingId } : {};
    return api.get('/farmer/offers', { params });
  },

  async respondToOffer(offerId, responseData) {
    // responseData: { action: 'ACCEPTED' | 'REJECTED' | 'COUNTERED', counterPrice, comments }
    return api.post(`/farmer/offers/${offerId}/respond`, responseData);
  },

  async getFarmerOrders() {
    return api.get('/farmer/orders');
  },
};
