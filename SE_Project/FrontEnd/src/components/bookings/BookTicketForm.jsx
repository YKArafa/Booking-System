import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const BookTicketForm = ({ eventId, price, availableTickets, onBookingComplete }) => {
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = quantity * price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/bookings', {
        eventId,
        quantity,
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (onBookingComplete) {
        onBookingComplete();
      }
      
      // Reset form
      setQuantity(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book tickets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Number of Tickets
        </label>
        <div className="mt-1 flex items-center">
          <button
            type="button"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.min(availableTickets, Math.max(1, parseInt(e.target.value) || 1)))}
            min="1"
            max={availableTickets}
            className="block w-20 text-center border-y border-gray-300 focus:ring-0 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity(q => Math.min(availableTickets, q + 1))}
            className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
            disabled={quantity >= availableTickets}
          >
            +
          </button>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 rounded-md">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Price per ticket:</span>
          <span className="font-medium">${price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2 text-lg font-semibold">
          <span>Total price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {availableTickets} tickets remaining
        </span>
        <button
          type="submit"
          disabled={loading || availableTickets === 0}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Book Tickets'}
        </button>
      </div>
    </form>
  );
};

BookTicketForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  availableTickets: PropTypes.number.isRequired,
  onBookingComplete: PropTypes.func,
};

export default BookTicketForm; 