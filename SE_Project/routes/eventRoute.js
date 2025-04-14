
const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, createEvent } = require('../controllers/eventController');
const checkRole = require('../middleware/checkRole');

// Public endpoint to fetch all events
router.post('/createEvent', checkRole('organizer') ,createEvent)
router.get('/', getAllEvents);
router.get('/:id', getEventById);



module.exports = router;

