import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Loader from '../shared/Loader'; // Assuming you have a loader component
import './BookTicketForm.css';
import { createBooking } from '../../../services/bookingServices'; 
function BookTicketForm({ event, onBookingSuccess }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: `/events/${event._id}` } });
      return;
    }

    setIsLoading(true);
    try {
      const booking = await createBooking(event._id, quantity);
      toast.success(`Booked ${quantity}`);
      onBookingSuccess(booking);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="book-ticket-form">
      <h3 className="form-title">Book Tickets</h3>
      {event.ticketCount > 0 ? (
        <>
          <div className="availability">Tickets left: {event.ticketCount}</div>
          <form onSubmit={handleSubmit} className="form-body">
            <label className="form-label">
              Quantity:
              <input
                type="number"
                min="1"
                max={event.ticketCount}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.min(parseInt(e.target.value) || 1, event.ticketCount)
                  )
                }
                className="form-input"
              />
            </label>
            <div className="price-summary">
              Total: ${(quantity * event.price).toFixed(2)}
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? <Loader size="small" /> : 'Confirm Booking'}
            </button>
          </form>
        </>
      ) : (
        <div className="sold-out">Sold Out!</div>
      )}
    </div>
  );
}

export default BookTicketForm;
