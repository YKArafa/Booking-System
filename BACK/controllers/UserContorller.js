// /api/v1/register       | POST  |Register a new user (Public)  ***
// /api/v1/login          | POST  |Authenticate user and return token (Public) ***
// /api/v1/forgetPassword | PUT   |Update user password (Public) 
// /api/v1/users          | GET   |Get a list of all users (Admin) ***
// /api/v1/users/profile  | GET   |Get current user's profile (Authenticated Users) ***
// /api/v1/users/profile  | PUT   |Update current user's profile (Authenticated Users) ***
// /api/v1/users/:id      | GET   |Get details of a single user (Admin)
// /api/v1/users/:id      | PUT   |Update user's role (Admin)
// /api/v1/users/:id      | DELETE| Delete a user (Admin)

const User = require('../Database/User.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = new User({ username: req.body.username, email: req.body.email, password: req.body.password, role: req.body.role });
    await user.save();
    const token = jwt.sign({ userId: user.ObjectId, role: user.role }, process.env.JWT_SECRET);
    res.status(201).json({ 
      message: 'Registration successful',
      token,
      user: {
        id: user.ObjectId,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Wrong Password' });
    }

    const token = jwt.sign(
      { userId: user.ObjectId, role: user.role }, 
      process.env.JWT_SECRET
    );
    
    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.ObjectId,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not login. Please try again.' });
  }
};

exports.updateProfile = async (req, res) => {
    try {
      const userId = req.user.userId;
      const updates = req.body;
      
      delete updates.password;
      delete updates.role;
      
      const user = await User.findByIdAndUpdate(userId, updates, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({
        id: user.ObjectId,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
};

exports.updateProfileadmin = async (req, res) => {
  try {
    const userId = req.params.id; 
    const updates = req.body;  
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.ObjectId,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

exports.getProfile = async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        id: user.ObjectId,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

exports.getallusers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch events',
      error: error.message
    });
  }
};

exports.userinfo = async (req, res) => {
  try {
    const usersinfo = await User.findOne({ ObjectId: req.params.id });
    if (!usersinfo) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      id: usersinfo.ObjectId,
      username: usersinfo.username,
      email: usersinfo.email,
      profilePicture: usersinfo.profilePicture,
      role: usersinfo.role
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch user info',
      error: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.user.userId === userId) {
      return res.status(400).json({ error: 'Admins cannot delete their own account' });
    }
    const deletedUser = await User.findOneAndDelete({ ObjectId: userId });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not update password' });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie('token', '', { httpOnly: true, secure: true, maxAge: 0, path: '/' });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


