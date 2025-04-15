const User = require('../models/User');

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = req.user; // Set by JWT auth middleware

      if (!user) {
        return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ success: false, message: 'Access denied. Insufficient role.' });
      }

      next(); // All good
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


