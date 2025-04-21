const express = require('express');
const router = express.Router();
const { authentication, requireRole } = require('../middleware/booking_middleware'); // Adjust path as needed
const { getUserBookings,createBooking,getBookingDetails,cancelBooking } = require('../controllers/bookingcontroller');

const standardUserOnly = [authentication, requireRole('standard')];
router.get('/api/v1/users/bookings', standardUserOnly, getUserBookings);
router.post('/api/v1/bookings', standardUserOnly, createBooking);
router.get('/api/v1/bookings/:id', standardUserOnly, getBookingDetails);
router.delete('/api/v1/bookings/:id', standardUserOnly, cancelBooking);

module.exports = router;
