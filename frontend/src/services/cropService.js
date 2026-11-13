import api from './api';

export const cropService = {
  // Public & Buyer Marketplace
  async getMarketplaceCrops(params = {}) {
    return api.get('/buyer/marketplace', { params });
  },

  async getCropDetails(id) {
    return api.get(`/buyer/crop/${id}`);
  },

  // Farmer CRUD
  async getFarmerListings(status = null) {
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
  }
};
