/* eslint-disable comma-dangle */
const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getUser,
  editUser,
  editUserSettings,
  disableUser,
  signUp,
  detailsUser,
  setPushToken,
  login,
  logout,
} = require('../controllers/userController');
const { validateLoggedUser, validateAdmin } = require('../middlewares/auth');
const { validateMongoId } = require('../validators/mongoValidator');
const {
  validateSignUp,
  validateLogin,
  validateEdit,
  validateEditSettings,
} = require('../validators/userValidator');

/*
 * User endpoints *
 */

router.post('/login', [validateLogin], login); // Login
router.post('/signup', [validateSignUp], signUp); // Sign up
router.post('/logout', [validateLoggedUser, logout]); // Logout
router.get('/me', validateLoggedUser, detailsUser); // Get details
router.put('/me', [validateEdit, validateLoggedUser], editUser); // Edit user
router.put('/me/push', [validateLoggedUser], setPushToken); // Set push token

// Edit settings
router.put(
  '/me/settings',
  [validateEditSettings, validateLoggedUser],
  editUserSettings
);

/*
 * Admin endpoints *
 */

router.get('/', validateAdmin, getAllUsers); // Get all users
router.get('/:id', [validateMongoId, validateAdmin], getUser); // Get a user
router.delete('/:id', [validateMongoId, validateAdmin], disableUser); // Disable a user

module.exports = router;
