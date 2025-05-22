import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple console log of form data
    console.log('Form submitted with:', {
      email: formData.email,
      password: formData.password
    });
    setUser({
      email: formData.email,
      password: formData.password
    });
    // Clear form after submission
    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      <p className="form-footer">
        Don't have an account?{' '}
        <span className="link" onClick={() => navigate('/register')}>
          Register here
        </span>
        Forgot your password?
        <span className="link" onClick={() => navigate('/reset-password')}>
          Reset password
        </span>
      </p>
    </div>
  );
};

export default Login; 