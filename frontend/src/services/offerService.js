import api from './api';

export const offerService = {
  // Buyer: Submit price offer
  async submitOffer(offerData) {
    return api.post('/buyer/offers', offerData);
  },

  // Buyer: View sent offers
  async getBuyerOffers() {
    return api.get('/buyer/offers');
  },

  // Farmer: View received offers
  async getFarmerOffers(listingId = null) {
    const params = listingId ? { listingId } : {};
    return api.get('/farmer/offers', { params });
  },

  // Farmer: Respond to offer (ACCEPTED, REJECTED, COUNTERED)
  async respondToOffer(offerId, responseData) {
    return api.post(`/farmer/offers/${offerId}/respond`, responseData);
  }
};
