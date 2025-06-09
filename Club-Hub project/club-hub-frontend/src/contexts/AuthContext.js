import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return {
          id: decodedToken.user_id,
          email: decodedToken.email,
          userType: decodedToken.user_type,
          firstName: decodedToken.first_name,
          lastName: decodedToken.last_name
        };
      } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return null;
      }
    }
    return null;
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getDashboardPath = (userType) => {
    switch (userType) {
      case 'ADMIN':
        return '/admin-dashboard';
      case 'EVENT_ADMIN':
        return '/event-admin-dashboard';
      case 'STUDENT':
        return '/student-dashboard';
      default:
        return '/';
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        password
      });

      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        const decodedToken = jwtDecode(response.data.access);
        const userData = {
          id: decodedToken.user_id,
          email: decodedToken.email,
          userType: decodedToken.user_type,
          firstName: decodedToken.first_name,
          lastName: decodedToken.last_name
        };
        
        setUser(userData);
        navigate(getDashboardPath(userData.userType));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 