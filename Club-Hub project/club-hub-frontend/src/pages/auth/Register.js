import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    userType: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing again
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2b6777] flex items-center justify-center p-4">
      <div className="bg-[#144272] rounded-xl p-8 shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[#c8d8e4] block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#205295] text-white placeholder-[#94A3B8] 
                       border border-[#2C74B3]/30 focus:outline-none focus:ring-2 focus:ring-[#52ab98]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#c8d8e4] block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#205295] text-white placeholder-[#94A3B8] 
                         border border-[#2C74B3]/30 focus:outline-none focus:ring-2 focus:ring-[#52ab98]"
                placeholder="First name"
                required
              />
            </div>
            <div>
              <label className="text-[#c8d8e4] block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#205295] text-white placeholder-[#94A3B8] 
                         border border-[#2C74B3]/30 focus:outline-none focus:ring-2 focus:ring-[#52ab98]"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[#c8d8e4] block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#205295] text-white placeholder-[#94A3B8] 
                       border border-[#2C74B3]/30 focus:outline-none focus:ring-2 focus:ring-[#52ab98]"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="text-[#c8d8e4] block mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#205295] text-white placeholder-[#94A3B8] 
                       border border-[#2C74B3]/30 focus:outline-none focus:ring-2 focus:ring-[#52ab98]"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#52ab98] text-white py-3 rounded-lg font-medium 
                     hover:bg-opacity-90 transition-all transform hover:-translate-y-1
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#c8d8e4]">
            Already have an account?{' '}
            <a href="/login" className="text-[#52ab98] hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register; 