const bookingModel = require('../models/booking');
const eventModel = require('../models/event');
const { notFoundError, badRequest } = require('../helpers/errorHandler');

const bookingController = {
    async makeBooking(req, res) {
        try {
            const { eventId, ticketCount } = req.body;
            const userId = req.user.id;

            const event = await eventModel.findOne({ _id: eventId });
            
            if (!event) {
                return res.status(404).send({ error: 'Event does not exist' });
            }

            if (event.status !== 'approved') {
                return res.status(400).send({ error: 'Event not approved yet' });
            }

            if (event.ticketsAvailable < ticketCount) {
                return res.status(400).send({ error: 'Not enough tickets left' });
            }

            const bookingData = {
                user: userId,
                event: eventId,
                numberOfTickets: ticketCount,
                totalCost: event.price * ticketCount,
                bookedAt: new Date()
            };

            const newBooking = await bookingModel.create(bookingData);
            
            // Update tickets left
            await eventModel.updateOne(
                { _id: eventId },
                { $inc: { ticketsAvailable: -ticketCount } }
            );

            res.status(201).send({
                message: 'Booking successful!',
                booking: newBooking
            });

        } catch (err) {
            console.error('Booking error:', err);
            res.status(500).send({ error: 'Something went wrong' });
        }
    },

    async getUserBookings(req, res) {
        try {
            const bookings = await bookingModel.find({ user: req.user.id })
                .populate('event', 'name date venue');

            res.send({
                count: bookings.length,
                bookings
            });
        } catch (err) {
            console.error('Error getting bookings:', err);
            res.status(500).send({ error: 'Failed to get bookings' });
        }
    },

    async getBookingDetails(req, res) {
        try {
            const booking = await bookingModel.findById(req.params.bookingId)
                .populate('event')
                .populate('user', 'name email');

            if (!booking) {
                return res.status(404).send({ error: 'Booking not found' });
            }

            if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).send({ error: 'Not allowed' });
            }

            res.send(booking);
        } catch (err) {
            console.error('Error getting booking:', err);
            res.status(500).send({ error: 'Failed to get booking' });
        }
    },

    async cancelBooking(req, res) {
        try {
            const booking = await bookingModel.findById(req.params.bookingId);
            
            if (!booking) {
                return res.status(404).send({ error: 'Booking not found' });
            }

            if (booking.user.toString() !== req.user.id) {
                return res.status(403).send({ error: 'Not your booking' });
            }

            const event = await eventModel.findById(booking.event);
            if (!event) {
                return res.status(404).send({ error: 'Event not found' });
            }

            // Return tickets
            await eventModel.updateOne(
                { _id: event._id },
                { $inc: { ticketsAvailable: booking.numberOfTickets } }
            );

            await bookingModel.deleteOne({ _id: booking._id });

            res.send({ message: 'Booking cancelled' });
        } catch (err) {
            console.error('Error cancelling booking:', err);
            res.status(500).send({ error: 'Failed to cancel' });
        }
    }
};

module.exports = bookingController;
