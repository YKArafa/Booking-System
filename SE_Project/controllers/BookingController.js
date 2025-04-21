const Booking = require('../models/Booking');
const Event = require('../models/Event');

async function bookEvent(req, res) {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).send('Event not found');
    if (event.ticketsAvailable < req.body.tickets) return res.status(400).send('Not enough tickets');

    const booking = new Booking({
      userId: req.user.id,
      eventId: event._id,
      ticketsBooked: req.body.tickets,
      totalAmount: event.price * req.body.tickets
    });

    await booking.save();
    
    event.ticketsAvailable -= req.body.tickets;
    await event.save();

    res.status(201).send(booking);
  } catch (err) {
    console.log('Booking error:', err);
    res.status(500).send('Booking failed');
  }
}

async function getMyBookings(req, res) {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('eventId', 'name date venue');
    res.send(bookings);
  } catch (err) {
    console.log('Get bookings error:', err);
    res.status(500).send('Failed to get bookings');
  }
}

async function cancelBooking(req, res) {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send('Booking not found');
    if (booking.userId.toString() !== req.user.id) return res.status(403).send('Not your booking');

    const event = await Event.findById(booking.eventId);
    event.ticketsAvailable += booking.ticketsBooked;
    await event.save();

    booking.status = 'cancelled';
    await booking.save();

    res.send('Booking cancelled');
  } catch (err) {
    console.log('Cancel error:', err);
    res.status(500).send('Cancellation failed');
  }
}

module.exports = {
  bookEvent,
  getMyBookings,
  cancelBooking
};
