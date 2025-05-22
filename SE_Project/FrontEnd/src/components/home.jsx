import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <h1>Welcome</h1>
      <div className="button-container">
        <button className="button login-button" onClick={handleLogin}>
          Login
        </button>
        <button className="button register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;



