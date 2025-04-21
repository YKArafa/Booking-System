
const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, createEvent, deleteEvent, updateEventStatus, getOrganizerAnalytics} = require('../controllers/eventController');
const checkRole = require('../middleware/checkRole');
const authenticate = require('../middleware/authenticate');
const checkRole = require('../middleware/checkRole');



router.put('/api/v1/events/:id', authenticate, checkRole('admin'), updateEventStatus); //update event
router.post('/api/v1/events', authenticate, checkRole('organizer') ,createEvent); //create event
router.get('/api/v1/events', authenticate, checkRole('organizer'), getAllEvents); //get all events
router.get('/api/v1/events/:id', authenticate, checkRole('organizer'), getEventById); // details of single event
router.delete('/api/v1/events/:id',authenticate, checkRole('organizer'),deleteEvent); //delete event
router.get('/api/v1/users/events', checkRole('organizer'), getEventsByOrganizer); //get current user's events
router.get('/api/v1/users/events/analytics', authenticate, checkRole('organizer'), getOrganizerAnalytics); //analytics


module.exports = router;

