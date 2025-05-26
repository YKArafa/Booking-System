import { useState, useEffect, useContext } from 'react';
import { fetchUserBookings, cancelBooking } from '../../services/bookingService';
import AuthContext from '../../context/AuthContext';
import BookingCard from '../../components/booking/BookingCard';
import { toast } from 'react-toastify';
import Loader from '../../components/shared/Loader';

const UserBookingsPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const bookings = await fetchUserBookings();
        setBookings(bookings);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings(bookings.filter(b => b._id !== bookingId));
      toast.success('Booking cancelled');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="user-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found</p>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookingsPage;
