import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Forms.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    profilePicture: '',
    role: ''
  });

  useEffect(() => {
    if (!user?.token) {
      navigate('/login');
      return;
    }
    fetchUserProfile();
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/v1/users/profile', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch profile');
      }

      const data = await response.json();
      setProfileData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          username: profileData.username,
          email: profileData.email,
          profilePicture: profileData.profilePicture
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update profile');
      }

      const data = await response.json();
      setProfileData(data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Update the user context with new data
      setUser(prev => ({
        ...prev,
        username: data.username,
        email: data.email
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Profile</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profileData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture URL:</label>
            <input
              type="url"
              id="profilePicture"
              name="profilePicture"
              value={profileData.profilePicture || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              value={profileData.role}
              disabled
              className="disabled-input"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">Save Changes</button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => {
                setIsEditing(false);
                fetchUserProfile();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-view">
          <div className="profile-field">
            <strong>Username:</strong> {profileData.username}
          </div>
          <div className="profile-field">
            <strong>Email:</strong> {profileData.email}
          </div>
          <div className="profile-field">
            <strong>Role:</strong> {profileData.role}
          </div>
          {profileData.profilePicture && (
            <div className="profile-picture">
              <img src={profileData.profilePicture} alt="Profile" />
            </div>
          )}
          <button 
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 