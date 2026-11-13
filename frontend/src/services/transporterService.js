import api from './api';

export const transporterService = {
  async getOpenRequests() {
    return api.get('/transporter/requests');
  },

  async submitBid(requestId, bidData) {
    // bidData: { bidAmount, vehicleType, estimatedDeliveryHours, notes }
    return api.post(`/transporter/requests/${requestId}/bids`, bidData);
  },

  async createDirectBooking(bookingData) {
    // bookingData: { orderId, pickupAddress, destinationAddress, cargoDescription, weightKg, agreedFreightCost }
    return api.post('/transporter/direct-booking', bookingData);
  },

  async getMyShipments() {
    return api.get('/transporter/shipments');
  },

  async getShipmentDetails(shipmentId) {
    return api.get(`/transporter/shipments/${shipmentId}`);
  },

  async updateShipmentStatus(shipmentId, statusData) {
    // statusData: { status, currentLocation, currentLatitude, currentLongitude, notes }
    return api.put(`/transporter/shipments/${shipmentId}/status`, statusData);
  },

  async submitDeliveryProof(shipmentId, formData) {
    return api.post(`/transporter/shipments/${shipmentId}/delivery-proof`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
