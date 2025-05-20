
const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, createEvent, deleteEvent, updateEventStatus, getOrganizerAnalytics, getApprovedEvents} = require('../controllers/eventController');
const checkRole = require('../middleware/checkRole');
const authenticate = require('../middleware/authenticate');
const checkRole = require('../middleware/checkRole');
const requireRole  = require('../middleware/user_middleware');


router.put('/api/v1/events/:id', authenticate, requireRole('organizer','admin'), updateEventStatus); //update event
router.post('/api/v1/events', authenticate, checkRole('organizer') ,createEvent); //create event
router.get('/api/v1/events/all', authenticate, checkRole('admin'), getAllEvents); //get all events
router.get('/api/v1/events/:id', authenticate, checkRole('organizer'), getEventById); // details of single event
router.delete('/api/v1/events/:id',authenticate, requireRole('organizer','admin'),deleteEvent); //delete event
router.get('/api/v1/users/events', checkRole('organizer'), getEventsByOrganizer); //get current user's events
router.get('/api/v1/users/events/analytics', authenticate, checkRole('organizer'), getOrganizerAnalytics); //analytics
router.get('/api/v1/events', authenticate, getApprovedEvents); //all approved events


module.exports = router;

