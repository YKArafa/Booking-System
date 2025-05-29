import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './components/Login';
import Home from './components/home';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import ProfilePage from './components/ProfilePage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';

// Import role-specific components
import MyBookings from './components/MyBookings';
import CreateEvent from './components/CreateEvent';
import MyEvents from './components/MyEvents';
import ManageUsers from './components/admin/ManageUsers';
import ManageEvents from './components/admin/ManageEvents';

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const initApp = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);

    return () => clearTimeout(initApp);
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes - Any authenticated user */}
            <Route 
              path="/profile" 
              element={<ProtectedRoute element={<ProfilePage />} />} 
            />

            {/* Protected routes - Standard users */}
            <Route 
              path="/my-bookings" 
              element={
                <ProtectedRoute 
                  element={<MyBookings />} 
                  allowedRoles={['standard']} 
                />
              } 
            />

            {/* Protected routes - Organizers */}
            <Route 
              path="/create-event" 
              element={
                <ProtectedRoute 
                  element={<CreateEvent />} 
                  allowedRoles={['organizer']} 
                />
              } 
            />
            <Route 
              path="/my-events" 
              element={
                <ProtectedRoute 
                  element={<MyEvents />} 
                  allowedRoles={['organizer']} 
                />
              } 
            />

            {/* Protected routes - Admins */}
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute 
                  element={<ManageUsers />} 
                  allowedRoles={['admin']} 
                />
              } 
            />
            <Route 
              path="/admin/events" 
              element={
                <ProtectedRoute 
                  element={<ManageEvents />} 
                  allowedRoles={['admin']} 
                />
              } 
            />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App; 
