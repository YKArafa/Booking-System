const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/EventDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(express.json());

const userroute = require('./routes/user_routes');
const eventRoute = require('./routes/eventRoute');
const bookingroute = require('./routes/booking_routes');

app.use('/api/v1/users/', userroute);
app.use('/api/v1/events/', eventRoute);
app.use('/api/v1/bookings', bookingroute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.use('/api/bookings', bookingRoute);
