import api from './api';

export const agriDataService = {
  async getWeather(city = 'Delhi', lat = null, lon = null) {
    const params = { city };
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    }
    return api.get('/data/weather', { params });
  },

  async getMandiPrices(crop = null, state = null) {
    const params = {};
    if (crop) params.crop = crop;
    if (state) params.state = state;
    return api.get('/data/mandi', { params });
  }
};
