const express = require('express');
const router = express.Router();
const { register, login, forgetpassword, getallusers } = require('../controllers/UserController');
const { hashPassword } = require('../middleware/user_middleware');
const { authentication, requireRole } = require('../middleware/user_middleware');
const { updateProfile } = require('../controllers/UserController');
const { getProfile } = require('../controllers/UserController');

router.post('/api/v1/register', hashPassword, register);
router.post('/api/v1//login', authentication, login);
router.put('/api/v1/users/forgetPassword', forgetpassword);
router.get('/api/v1/users ', authentication, requireRole(admin), getallusers);
router.put('/api/v1/users/profile', authentication, updateProfile);
router.get('/api/v1/users/profile', authentication, getProfile);
router.get('/api/v1/users/:id', authentication, requireRole(admin), userinfo);
router.put('/api/v1/users/:id', authentication, requireRole(admin), updateProfile);
router.delete('/api/v1/users/:id', authentication, requireRole(admin), deleteUser);
module.exports = router;
