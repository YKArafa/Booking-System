
const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, createEvent, deleteEvent, updateEventStatus, getOrganizerAnalytics} = require('../controllers/eventController');
const checkRole = require('../middleware/checkRole');
const authenticate = require('../middleware/authenticate');
const checkRole = require('../middleware/checkRole');



router.put('/:id/status', authenticate, checkRole('admin'), updateEventStatus);
router.post('/createEvent', authenticate, checkRole('organizer') ,createEvent)
router.get('/', authenticate, checkRole('organizer'), getAllEvents);
router.get('/:id', authenticate, checkRole('organizer'), getEventById);
router.delete('/:id',authenticate, checkRole('organizer'),deleteEvent);
//router.get('/users/event/', checkRole('organizer'), getEventsByOrganizer);
router.get('/analytics/organizer', authenticate, checkRole('organizer'), getOrganizerAnalytics);


module.exports = router;

