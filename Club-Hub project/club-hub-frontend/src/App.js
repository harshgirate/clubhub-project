import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import EventAdminDashboard from './pages/dashboards/EventAdminDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Dashboard Router Component
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.userType) {
    case 'ADMIN':
      return <Navigate to="/admin-dashboard" replace />;
    case 'EVENT_ADMIN':
      return <Navigate to="/event-admin-dashboard" replace />;
    case 'STUDENT':
      return <Navigate to="/student-dashboard" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/clubs" element={
            <ProtectedRoute>
              <Clubs />
            </ProtectedRoute>
          } />
          
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardRouter />} />
          
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/event-admin-dashboard" element={
            <ProtectedRoute allowedRoles={['EVENT_ADMIN']}>
              <EventAdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/student-dashboard" element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
