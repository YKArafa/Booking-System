import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-[var(--text-secondary)] text-lg">
          {user?.token 
            ? `Welcome back, ${user.username}!`
            : 'Please login or register to continue'}
        </p>
      </div>

      {!user?.token && (
        <div className="button-container">
          <button className="button login-button" onClick={handleLogin}>
            Login
          </button>
          <button className="button register-button" onClick={handleRegister}>
            Register
          </button>
        </div>
      )}

      {user?.token && (
        <div className="text-center">
          <p className="text-[var(--text-secondary)] text-lg">
            {user.role === 'standard' && 'View your bookings and upcoming events'}
            {user.role === 'organizer' && 'Manage your events and create new ones'}
            {user.role === 'admin' && 'Access admin controls and manage the system'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;



