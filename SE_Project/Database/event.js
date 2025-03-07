const mongoose = require("mongoose");
const Event = require("./Event.schema");

mongoose.connect("mongodb://localhost:27017/EventDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

  
// Create a new event
const createEvent = async () => {
  try {
    const event = new Event({
      title: "Tech Conference 2025",
      description: "A conference about the latest technology trends.",
      date: new Date("2025-05-10"),
      location: " New Adminstrative Capital, Egypt",
      category: "Technology",
      image: "https://example.com/event-image.jpg",
      price: 50,
      capacity: 500,
      remainingTickets: 500, // Initially, all tickets are available
      organizer: '67caef869aced961e2cf763d',
    });

    const savedEvent = await event.save();
    console.log("Event Created:", savedEvent);
  } catch (err) {
    console.error("Error creating event:", err);
  } finally {
    mongoose.connection.close();
  }
};

createEvent();
