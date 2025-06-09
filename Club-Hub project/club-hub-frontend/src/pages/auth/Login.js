import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      const user = JSON.parse(localStorage.getItem('user'));
      
      const dashboardRoutes = {
        'STUDENT': '/dashboard',
        'ADMIN': '/admin',
        'EVENT_ADMIN': '/event-admin'
      };
      navigate(dashboardRoutes[user.userType] || '/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2b6777] flex items-center justify-center p-4">
      <div className="bg-[#144272] rounded-xl p-8 shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
        
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#205295] text-white placeholder-[#94A3B8] 
                       border border-[#2C74B3]/30 focus:outline-none focus:ring-2 focus:ring-[#52ab98]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-[#c8d8e4] block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#205295] text-white placeholder-[#94A3B8] 
                       border border-[#2C74B3]/30 focus:outline-none focus:ring-2 focus:ring-[#52ab98]"
              placeholder="Enter your password"
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
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center">
            <p className="text-[#c8d8e4]">
              Don't have an account?{' '}
              <Link 
                to="/register"
                className="text-[#52ab98] hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; 