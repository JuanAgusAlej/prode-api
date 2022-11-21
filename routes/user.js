const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getUser,
  editUser,
  editUserNotification,
  disableUser,
  signUp,
  detailsUser,
  login,
} = require('../controllers/userController');
const { validateLoggedUser, validateAdmin } = require('../middlewares/auth');

/*
 * User endpoints *
 */
router.post('/login', login); // Login
router.post('/signup', signUp); // Sign up
router.get('/me', validateLoggedUser, detailsUser); // Get details
router.put('/me', validateLoggedUser, editUser); // Edit user
router.put('/me/notifications', validateLoggedUser, editUserNotification); // Edit notifications

/*
 * Admin endpoints *
 */

router.get('/', validateAdmin, getAllUsers); // Get all users
router.get('/:id', validateAdmin, getUser); // Get a user
router.delete('/:id', validateAdmin, disableUser); // Disable a user

module.exports = router;
