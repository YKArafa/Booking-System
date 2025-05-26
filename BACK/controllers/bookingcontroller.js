const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId, status: { $ne: 'canceled' } })
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { eventId, numberOfTickets } = req.body;

    if (!eventId || !numberOfTickets || numberOfTickets <= 0) {
      return res.status(400).json({ error: 'Event ID and valid number of tickets are required' });
    }

    const event = await Event.findOne({ ObjectId: eventId });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.remainingTickets < numberOfTickets) {
      return res.status(400).json({ error: 'Not enough tickets available' });
    }
    const total = event.price * numberOfTickets;
    const session = await Booking.startSession();
    session.startTransaction();

    try {
      const booking = await Booking.create([{
        user: req.user.userId,
        event: eventId,
        numberOfTickets,
        totalPrice: total,
        status: 'confirmed'
      }], { session });

      event.remainingTickets -= numberOfTickets;
      await event.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json(booking[0]);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Booking failed' });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking || booking.user.toString() !== req.user.sub) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booking details' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    if (booking.user.toString() !== req.user.sub) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (booking.status === 'canceled') {
      return res.status(400).json({ error: 'Booking is already canceled' });
    }

    const session = await Booking.startSession();
    session.startTransaction();

    try {
      booking.status = 'canceled';
      await booking.save({ session });

      const event = await Event.findById(booking.event);
      event.remainingTickets += booking.numberOfTickets;
      await event.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Cancellation failed' });
  }
};
