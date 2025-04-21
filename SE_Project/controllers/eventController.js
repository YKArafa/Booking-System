const Event = require('../models/event');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event',
      error: error.message
    });
  }
}

const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, image, price, capacity, remainingTickets, organizer } = req.body;

    if (!title || !date || !location || !category || !image || !price || !capacity || !remainingTickets || !organizer) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      image,
      price,
      capacity,
      remainingTickets,
      organizer
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      data: newEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message
    });
  }
}
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message
    });
  }
}

const getEventsByOrganizer = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id });
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};
const getOrganizerAnalytics = async (req, res) => {
  try {
      const organizerId = req.user._id; // assuming `req.user` is set by your auth middleware

      const events = await Event.find({ organizer: organizerId });

      const analytics = events.map(event => {
          const booked = event.capacity - event.remainingTickets;
          const percentageBooked = event.capacity > 0
              ? (booked / event.capacity) * 100
              : 0;

          return {
              eventId: event._id,
              title: event.title,
              percentageBooked: Number(percentageBooked.toFixed(2))
          };
      });

      res.status(200).json({ analytics });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const eventId = req.params.id;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a status'
      });
    }

    const event = await Event.findByIdAndUpdate(eventId, { status }, { new: true });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update event status',
      error: error.message
    });
  }
}
module.exports = { getAllEvents, getEventById, createEvent, deleteEvent, getEventsByOrganizer, getOrganizerAnalytics, updateEventStatus };
