import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedAdminRoute = ({ children }) => {
  const { user, token, loading } = useAuth();
  if (loading) return null;
  if (!token || user?.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

export default ProtectedAdminRoute;
