import { Link } from 'react-router-dom';

const BookingCard = ({ booking, onCancel }) => {
    return (
      <div className={`booking-card ${booking.status}`}>
        <div className="booking-header">
          <h3>
            <Link to={`/events/${booking.event._id}`}>
              {booking.event.title}
            </Link>
          </h3>
          <span className={`status ${booking.status}`}>
            {booking.status.toUpperCase()}
          </span>
        </div>
        
        <div className="booking-details">
 
          <p><strong>Tickets:</strong> {booking.numberOfTickets}</p>
          <p><strong>Total:</strong> ${booking.totalPrice.toFixed(2)}</p>
        </div>
  
        {booking.status === 'confirmed' && (
          <button 
            onClick={() => onCancel(booking._id)}
            className="cancel-btn"
          >
            Cancel Booking
          </button>
        )}
      </div>
    );
  };
