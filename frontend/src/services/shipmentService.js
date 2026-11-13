import api from './api';

export const shipmentService = {
  // Transporter freight loads
  async getOpenFreightRequests() {
    return api.get('/transporter/requests');
  },

  async submitBid(requestId, bidData) {
    return api.post(`/transporter/requests/${requestId}/bids`, bidData);
  },

  async createDirectBooking(bookingData) {
    return api.post('/transporter/direct-booking', bookingData);
  },

  // Active trips
  async getTransporterShipments() {
    return api.get('/transporter/shipments');
  },

  async getShipmentDetails(shipmentId) {
    return api.get(`/transporter/shipments/${shipmentId}`);
  },

  async updateShipmentStatus(shipmentId, statusData) {
    return api.put(`/transporter/shipments/${shipmentId}/status`, statusData);
  },

  async submitDeliveryProof(shipmentId, formData) {
    return api.post(`/transporter/shipments/${shipmentId}/delivery-proof`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};
