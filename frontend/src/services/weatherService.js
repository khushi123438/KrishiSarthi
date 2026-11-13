import api from './api';

export const weatherService = {
  async getWeather(city = 'Karnal', lat = null, lon = null) {
    const params = { city };
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    }
    return api.get('/data/weather', { params });
  }
};
