import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import ConfirmationDialog from '../admin/ConfirmationDialog';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/my-bookings');
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const handleCancel = (booking) => {
    setSelectedBooking(booking);
    setIsDeleteDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    try {
      await axios.delete(`/api/bookings/${selectedBooking.id}`);
      setBookings(bookings.filter(b => b.id !== selectedBooking.id));
      setIsDeleteDialogOpen(false);
    } catch (err) {
      setError('Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-600 p-8">
          <p className="mb-4">You haven't made any bookings yet.</p>
          <Link
            to="/events"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      to={`/events/${booking.event.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-indigo-600"
                    >
                      {booking.event.title}
                    </Link>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{format(new Date(booking.event.date), 'PPP')}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{booking.event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {booking.quantity} {booking.quantity === 1 ? 'ticket' : 'tickets'}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mt-1">
                      ${(booking.quantity * booking.event.price).toFixed(2)}
                    </div>
                    <Link
                      to={`/bookings/${booking.id}`}
                      className="text-sm text-indigo-600 hover:text-indigo-800 block mt-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleCancel(booking)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        onConfirm={handleCancelConfirm}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default UserBookingsPage; 