const User = require('../Database/User.schema');

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const userId = req.body.organizer;

      if (!userId) {
        return res.status(400).json({ success: false, message: 'Organizer ID missing in request' });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (user.role !== role) {
        return res.status(403).json({ success: false, message: 'Access denied. Insufficient role.' });
      }

      // Attach user to request for further use
      req.user = user;

      next(); // Allowed
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error during role check',
        error: error.message
      });
    }
  };
};

module.exports = checkRole;
