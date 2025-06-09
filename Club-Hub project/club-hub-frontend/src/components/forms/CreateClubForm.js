import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function CreateClubForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    meetingTime: '',
    location: '',
    email: '',
    requirements: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/clubs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          admin: user.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create club');
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to create club. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#144272] p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Club</h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[#c8d8e4] block mb-2">Club Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#205295] text-white"
            required
          />
        </div>

        <div>
          <label className="text-[#c8d8e4] block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#205295] text-white h-32"
            required
          />
        </div>

        <div>
          <label className="text-[#c8d8e4] block mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#205295] text-white"
            required
          >
            <option value="">Select Category</option>
            <option value="technical">Technical</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="social">Social</option>
          </select>
        </div>

        <div>
          <label className="text-[#c8d8e4] block mb-2">Meeting Time</label>
          <input
            type="text"
            value={formData.meetingTime}
            onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#205295] text-white"
            placeholder="e.g., Every Monday at 5 PM"
            required
          />
        </div>

        <div>
          <label className="text-[#c8d8e4] block mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#205295] text-white"
            required
          />
        </div>

        <div>
          <label className="text-[#c8d8e4] block mb-2">Contact Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#205295] text-white"
            required
          />
        </div>

        <div>
          <label className="text-[#c8d8e4] block mb-2">Requirements</label>
          <textarea
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#205295] text-white h-24"
            placeholder="Any specific requirements for joining the club"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#52ab98] text-white py-2 rounded-lg font-medium 
                     hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Club'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-[#52ab98] text-white rounded-lg 
                     hover:bg-[#52ab98]/10 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateClubForm; 