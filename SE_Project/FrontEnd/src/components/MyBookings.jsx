import React from 'react';
import { showToast } from '../utils/toast';

const MyBookings = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <div className="bg-[var(--bg-secondary)] rounded-lg p-6">
        <p className="text-[var(--text-secondary)]">Your bookings will appear here.</p>
      </div>
    </div>
  );
};

export default MyBookings; 