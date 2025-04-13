
const express = require('express');
const router = express.Router();
const { getAllEvents } = require('../controllers/eventController');

// Public endpoint to fetch all events
router.get('/', getAllEvents);

module.exports = router;

