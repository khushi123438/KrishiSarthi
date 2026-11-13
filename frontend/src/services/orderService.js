import api from './api';

export const orderService = {
  // Buyer Orders
  async getBuyerOrders() {
    return api.get('/buyer/orders');
  },

  // Farmer Orders
  async getFarmerOrders() {
    return api.get('/farmer/orders');
  }
};
