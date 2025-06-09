import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length === 0) {
    return children;
  }

  if (!allowedRoles.includes(user.userType)) {
    const dashboardRoutes = {
      'STUDENT': '/dashboard',
      'ADMIN': '/admin',
      'EVENT_ADMIN': '/event-admin'
    };
    return <Navigate to={dashboardRoutes[user.userType]} replace />;
  }

  return children;
}; 