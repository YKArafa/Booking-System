
const User = require('../Database/User.schema');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ sub: user.ObjectId, role: user.role }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Could not register User' });
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
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

