import api from './api';

export const clubService = {
  // Club operations
  getAllClubs: () => api.get('/clubs/'),
  getClubById: (id) => api.get(`/clubs/${id}/`),
  createClub: (data) => api.post('/clubs/', data),
  updateClub: (id, data) => api.patch(`/clubs/${id}/`, data),
  deleteClub: (id) => api.delete(`/clubs/${id}/`),
  joinClub: (id) => api.post(`/clubs/${id}/join/`),
  leaveClub: (id) => api.post(`/clubs/${id}/leave/`),

  // Event operations
  getAllEvents: () => api.get('/events/'),
  getEventById: (id) => api.get(`/events/${id}/`),
  createEvent: (data) => api.post('/events/', data),
  updateEvent: (id, data) => api.patch(`/events/${id}/`, data),
  deleteEvent: (id) => api.delete(`/events/${id}/`),
  registerForEvent: (id) => api.post(`/events/${id}/register/`),
  unregisterFromEvent: (id) => api.post(`/events/${id}/unregister/`),
}; 