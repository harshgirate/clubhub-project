import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth();

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If roles are specified and user's role is not included, redirect to dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.user_type)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PrivateRoute; 