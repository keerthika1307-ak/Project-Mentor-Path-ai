import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = ({ children, requiredRole }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Check if token exists and is valid
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check token expiration
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role permissions
if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
    
  } catch (err) {
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
