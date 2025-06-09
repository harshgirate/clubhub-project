import { useState } from 'react';
import { clubService } from '../services/clubService';

export const useClubManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOperation = async (operation, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation(...args);
      return result.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createClub: (data) => handleOperation(clubService.createClub, data),
    updateClub: (id, data) => handleOperation(clubService.updateClub, id, data),
    deleteClub: (id) => handleOperation(clubService.deleteClub, id),
    createEvent: (data) => handleOperation(clubService.createEvent, data),
    updateEvent: (id, data) => handleOperation(clubService.updateEvent, id, data),
    deleteEvent: (id) => handleOperation(clubService.deleteEvent, id),
  };
}; 