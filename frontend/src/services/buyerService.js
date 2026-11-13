import api from './api';

export const buyerService = {
  async getMarketplace(params = {}) {
    return api.get('/buyer/marketplace', { params });
  },

  async getCropDetails(id) {
    return api.get(`/buyer/crop/${id}`);
  },

  async makeOffer(offerData) {
    // offerData: { cropListingId, offeredPricePerUnit, quantity, deliveryPreference, notes }
    return api.post('/buyer/offers', offerData);
  },

  async getMyOrders() {
    return api.get('/buyer/orders');
  },

  async getMyOffers() {
    return api.get('/buyer/offers');
  }
};
