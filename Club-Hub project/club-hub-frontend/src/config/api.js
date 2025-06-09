const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/token/`,
  REGISTER: `${API_BASE_URL}/register/`,
  CLUBS: `${API_BASE_URL}/clubs/`,
  EVENTS: `${API_BASE_URL}/events/`,
  USER_PROFILE: `${API_BASE_URL}/users/profile/`,
};

export default API_BASE_URL; 