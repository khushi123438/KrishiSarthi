import api from './api';

export const aiService = {
  async chatWithKisanMitra(message, language = 'HI', userRole = 'FARMER') {
    return api.post('/ai/chat', { message, language, userRole });
  },

  async parseVoiceListing(transcript) {
    return api.post('/ai/voice-listing', { transcript });
  }
};
