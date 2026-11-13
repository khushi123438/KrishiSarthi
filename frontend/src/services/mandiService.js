import api from './api';

export const mandiService = {
  async getMandiPrices(crop = null, state = null) {
    const params = {};
    if (crop) params.crop = crop;
    if (state) params.state = state;
    return api.get('/data/mandi', { params });
  }
};
