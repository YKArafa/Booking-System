const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/UserController');
const { hashPassword } = require('../middleware/user_middleware');

router.post('/register', hashPassword, register);
router.post('/login', login);

const { auth, requireRole } = require('../middleware/user_middleware');
const { updateProfile } = require('../controllers/UserController');

router.put('/profile', authMiddleware, updateProfile);
router.get('/profile', authMiddleware, getProfile)
module.exports = router;
