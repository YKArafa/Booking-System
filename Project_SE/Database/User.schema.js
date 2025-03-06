
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
  role: {
    type: String,
    required: true
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userschema);

module.exports = User;
