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


module.exports = { getAllEvents, getEventById, createEvent };
