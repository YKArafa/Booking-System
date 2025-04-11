
// /api/v1/register       | POST  |Register a new user (Public)
// /api/v1/login          | POST  |Authenticate user and return token (Public)
// /api/v1/forgetPassword | PUT   |Update user password (Public)
// /api/v1/users          | GET   |Get a list of all users (Admin)
// /api/v1/users/profile  | GET   |Get current user’s profile (Authenticated Users)
// /api/v1/users/profile  | PUT   |Update current user’s profile (Authenticated Users)
// /api/v1/users/:id      | GET   |Get details of a single user (Admin)
// /api/v1/users/:id      | PUT   |Update user’s role (Admin)
// /api/v1/users/:id      | DELETE| Delete a user (Admin)

const User = require('../Database/User.schema');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ sub: user.ObjectId, role: user.role }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
};

exports.updateProfile = async (req, res) => {
    try {
      const userId = req.user.sub; 
      const updates = req.body;  
      const user = await User.findByIdAndUpdate(userId, updates, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  };
exports.getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.sub);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

