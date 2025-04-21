const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/BookingController');
const auth = require('../middleware/auth');
router.use(auth.verifyToken);

router.post('/', 
    auth.checkRole('user'), 
    bookingCtrl.makeBooking
);

router.get('/my-bookings', 
    auth.checkRole('user'),
    bookingCtrl.getUserBookings
);

router.get('/:bookingId', 
    auth.checkRole(['user', 'admin']),
    bookingCtrl.getBookingDetails
);

router.delete('/:bookingId', 
    auth.checkRole('user'),
    bookingCtrl.cancelBooking
);

module.exports = router;
