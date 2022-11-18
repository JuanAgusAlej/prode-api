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
  validateUser,
} = require('../controllers/userController');
const { validateLoggedUser } = require('../middlewares/auth');

/*
 * User endpoints *
 */
router.post('/login', login); // Login
router.post('/signup', signUp); // Sign up
router.get('/me', validateLoggedUser, detailsUser); // Get details
router.put('/me', validateLoggedUser, editUser); // Edit a user
router.put('/me/notifications', validateLoggedUser, editUserNotification); // Edit notifications
router.put('/validate', validateUser)

/*
 * Admin endpoints *
 */

router.get('/', getAllUsers); // Get all users
router.get('/:id', getUser); // Get a user
router.delete('/:id', disableUser); // Disable a user

module.exports = router;
