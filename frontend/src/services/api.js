import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ticketService = {
  // Tickets
  getAllTickets: () => api.get('/tickets/'),
  getTicket: (id) => api.get(`/tickets/${id}/`),
  createTicket: (ticketData) => api.post('/tickets/', ticketData),
  updateTicket: (id, ticketData) => api.put(`/tickets/${id}/`, ticketData),
  deleteTicket: (id) => api.delete(`/tickets/${id}/`),
  
  // Replies
  getAllReplies: () => api.get('/replies/'),
  generateReply: (ticketId) => api.post(`/tickets/${ticketId}/generate_reply/`),
  
  // Analytics
  getAnalytics: () => api.get('/analytics/'),
  
  // Feedback
  submitFeedback: (replyId, feedbackData) => 
    api.post(`/replies/${replyId}/feedback/`, feedbackData),
  
  // File Upload
  uploadFile: (ticketId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_BASE_URL}/tickets/${ticketId}/upload/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Voice Transcription
  transcribeVoice: (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    return axios.post(`${API_BASE_URL}/transcribe/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

export default api;
