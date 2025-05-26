const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  ObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  username: {
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

// Virtual getter for ObjectId
userschema.virtual('id').get(function() {
  return this.ObjectId || this._id;
});

// Ensure virtuals are included in JSON
userschema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret.ObjectId || ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const User = mongoose.model("User", userschema);

module.exports = User;
