const mongoose = require("mongoose");
const User = require("./User.schema");

mongoose.connect("mongodb://localhost:27017/EventDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("Connected to MongoDB");

  // Create and save a new user
  const user = new User({
    name: "Yahya",
    email: "random@gmail.com",
    profilePicture: "url",
    password: "12345",
    role: "Admin",
  });

  // Create and save a new user
  const user2 = new User({
    name: "Ziad",
    email: "ziad@gmail.com",
    profilePicture: "url",
    password: "12345",
    role: "organizer",
  });

  try {
    const savedUser = await user.save();
    console.log('User saved:', savedUser);
    const savedUser2 = await user2.save();
    console.log('User saved:', savedUser2);
  } catch (err) {
    console.error('Error saving user:', err);
  }
});


