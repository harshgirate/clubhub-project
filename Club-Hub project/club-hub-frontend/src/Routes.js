import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import { StudentDashboard } from './pages/dashboards';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import EventAdminDashboard from './pages/dashboards/EventAdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/clubs" element={<Clubs />} />
      <Route path="/events" element={<Events />} />
      <Route path="/dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute allowedRoles={['ADMIN']}><AdminDashboard /></PrivateRoute>} />
      <Route path="/event-admin" element={<PrivateRoute allowedRoles={['EVENT_ADMIN']}><EventAdminDashboard /></PrivateRoute>} />
    </RouterRoutes>
  );
}

export default Routes; 