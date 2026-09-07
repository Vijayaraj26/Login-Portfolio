import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api';
import Portfolio from './Portfolio';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndHealth = async () => {
      try {
        // Fetch current user from protected endpoint /api/users/me
        const profile = await authService.getCurrentUser();
        setUserData(profile);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }

      try {
        // Check health of backend
        const health = await authService.checkHealth();
        if (health.status === 'ok') {
          setBackendStatus('connected');
        }
      } catch (err) {
        setBackendStatus('error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndHealth();
  }, []);

  const handleLogout = () => {
    // 1. Remove JWT token and user info from browser storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // 2. Redirect to login page
    navigate('/login');
  };

  return (
    <Portfolio
      userData={userData}
      backendStatus={backendStatus}
      onLogout={handleLogout}
    />
  );
};

export default Home;
