const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingController');
const auth = require('../middlewares/auth');

router.use(auth.verifyUser);

router.post('/', bookingController.bookEvent);
router.get('/my', bookingController.getMyBookings);
router.put('/cancel/:id', bookingController.cancelBooking);

module.exports = router;
