const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/EventDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(express.json());

const eventRoute = require('./routes/eventRoute');
const bookingRoute = require('./routes/bookingRoute');

app.use('/api/v1/events/', eventRoute);
app.use('/api/bookings', bookingRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use('/api/bookings', bookingRoute);
