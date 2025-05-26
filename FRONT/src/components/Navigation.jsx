import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-[var(--bg-secondary)] py-4 px-6 border-b border-[var(--border-color)]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-[var(--text-primary)] text-xl font-bold">
          Home
        </Link>
        
        <div className="flex items-center gap-6">
          {!user?.token ? (
            // Public navigation - empty for default home
            <></>
          ) : (
            // Authenticated navigation
            <>
              <Link to="/profile" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                Profile
              </Link>
              
              {/* Standard user links */}
              {user.role === 'standard' && (
                <Link to="/my-bookings" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  My Bookings
                </Link>
              )}
              
              {/* Organizer links */}
              {user.role === 'organizer' && (
                <>
                  <Link to="/create-event" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                    Create Event
                  </Link>
                  <Link to="/my-events" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                    My Events
                  </Link>
                </>
              )}
              
              {/* Admin links */}
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/users" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                    Manage Users
                  </Link>
                  <Link to="/admin/events" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                    Manage Events
                  </Link>
                </>
              )}
              
              <button
                onClick={handleLogout}
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 