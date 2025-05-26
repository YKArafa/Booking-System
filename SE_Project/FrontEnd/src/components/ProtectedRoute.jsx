import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from './common/LoadingSpinner';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate checking auth state
    const checkAuth = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(checkAuth);
  }, []);

  useEffect(() => {
    // Show toast when unauthorized access is attempted
    if (!isLoading && allowedRoles && !allowedRoles.includes(user?.role)) {
      toast.error('You do not have permission to access this page');
    }
  }, [isLoading, allowedRoles, user?.role]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user?.token) {
    // Not logged in, redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User's role is not authorized, redirect to home page
    return <Navigate to="/" replace />;
  }

  // Authorized, render component
  return element;
};

export default ProtectedRoute; 