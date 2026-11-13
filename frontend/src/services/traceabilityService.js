import api from './api';

export const traceabilityService = {
  async getBatchByCode(batchCode) {
    return api.get(`/traceability/batch/${encodeURIComponent(batchCode)}`);
  },

  async addEvent(batchCode, eventData) {
    // eventData: { eventType, eventName, actorName, location, latitude, longitude, description, certificationRef }
    return api.post(`/traceability/batch/${encodeURIComponent(batchCode)}/event`, eventData);
  }
};
