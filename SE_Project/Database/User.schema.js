
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: {
    type: String, 
    default: null // will be changed
  },
  password: {
    type: String,
    required: true
  },
  role: {  // going to add in front end the option to choose which role (in form of buttons), so no enum needed and they are fixed options
    type: String,
    required: true
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userschema);

module.exports = User;
