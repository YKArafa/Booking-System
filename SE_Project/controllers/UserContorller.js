
// /api/v1/register       | POST  |Register a new user (Public)  ***
// /api/v1/login          | POST  |Authenticate user and return token (Public) ***
// /api/v1/forgetPassword | PUT   |Update user password (Public) 
// /api/v1/users          | GET   |Get a list of all users (Admin) ***
// /api/v1/users/profile  | GET   |Get current user’s profile (Authenticated Users) ***
// /api/v1/users/profile  | PUT   |Update current user’s profile (Authenticated Users) ***
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
  try {
    const user = await User.findOne({ email: req.body.email });
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!user || !isValidPassword) {
      return res.redirect('/login');
    }
    return res.redirect('/profile');

  } catch (error) {
    res.status(400).json({ error: 'Could Not Login'});
  }
};

exports.updateProfile = async (req, res) => {
    try {
      const userId = req.User.sub; 
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
      const user = await User.findById(req.body.ObjectId);
      res.json({
        username: usersinfo.username,
        email: usersinfo.email,
        profilePicture: usersinfo.profilePicture,
        role: usersinfo.role
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
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
    const usersinfo = await User.findOne(req.body.ObjectId);
     res.status(200).json({
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
    const userId = req.body.ObjectId;
    if (req.user.sub === userId) {
       res.status(400).json({ error: 'Admins cannot delete their own account' });
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
       res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne(email);
    const updateduser = await User.Update(user.ObjectId, req.body.password, { new: true });
    res.json({ message: 'Passowrd Updated successfully' });
  } catch (error) {
    res.json({ error: 'Could not update password' });
  }
};


