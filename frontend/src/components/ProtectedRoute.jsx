import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component:
 * Ensures that only authenticated users with a stored JWT token can access the route.
 * Redirects unauthenticated users to the /login page.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
