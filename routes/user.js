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
const {
  validateSignUp,
  validateLogin,
  validateMongoId,
} = require('../validators/userValidator');

/*
 * User endpoints *
 */

router.post('/login', [validateLogin], login); // Login
router.post('/signup', [validateSignUp], signUp); // Sign up
router.get('/me', validateLoggedUser, detailsUser); // Get details
router.put('/me', validateLoggedUser, editUser); // Edit user
router.put('/me/notifications', validateLoggedUser, editUserNotification); // Edit notifications

/*
 * Admin endpoints *
 */

router.get('/', validateAdmin, getAllUsers); // Get all users
router.get('/:id', [validateMongoId, validateAdmin], getUser); // Get a user
router.delete('/:id', [validateMongoId, validateAdmin], disableUser); // Disable a user

module.exports = router;
