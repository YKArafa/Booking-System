const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const auth = require('../middlewares/authMiddleware');

router.use(auth.checkAuth);
router.get('/', BookingController.getAllBookings);
router.get('/:id', BookingController.getBooking);

router.post('/', 
    auth.checkRole('user'), 
    BookingController.createBooking
);

router.get('/my-bookings', 
    auth.checkRole('user'),
    BookingController.getUserBookings
);

router.delete('/:id', 
    auth.checkRole('user'),
    auth.checkBookingOwner,
    BookingController.cancelBooking
);

// Admin routes
router.get('/admin/all', 
    auth.checkRole('admin'),
    BookingController.getAllBookingsAdmin
);

module.exports = router;
