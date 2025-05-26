import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import ConfirmationDialog from '../admin/ConfirmationDialog';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get(`/api/bookings/${id}`);
      setBooking(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch booking details');
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      await axios.delete(`/api/bookings/${id}`);
      navigate('/bookings');
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

  if (!booking) {
    return (
      <div className="text-center text-gray-600 p-4">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
          <Link
            to="/bookings"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to My Bookings
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Information</h2>
                <div className="space-y-3">
                  <div>
                    <Link
                      to={`/events/${booking.event.id}`}
                      className="text-lg font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      {booking.event.title}
                    </Link>
                  </div>
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

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Booking ID:</span>
                    <span className="font-mono">{booking.id}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Booking Date:</span>
                    <span>{format(new Date(booking.createdAt), 'PPP')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Number of Tickets:</span>
                    <span>{booking.quantity}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Price per Ticket:</span>
                    <span>${booking.event.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span>${(booking.quantity * booking.event.price).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Need to make changes to your booking?
                </div>
                <button
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        onConfirm={handleCancel}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
};

export default BookingDetails; 