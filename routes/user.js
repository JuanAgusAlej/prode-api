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

/**
 * @openapi
 * /users/signup:
 *   post:
 *    tags:
 *    - users
 *    summary: Insert the information of new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BodyUserSignup'
 *      required: true
 *    responses:
 *      201:
 *        description: (OK) user information was saved correctly
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BodyUserSignup'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 *
 * /user/login:
 *  post:
 *    tags:
 *    - users
 *    summary: Login to the app
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              uid:
 *                type: string
 *                description: id from google SSO
 *      required: true
 *    responses:
 *      200:
 *        description: (OK) user validated correctly
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BodyUserLogin'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 *
 * /user/me:
 *  get:
 *    tags:
 *    - users
 *    summary: get logged user
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BodyUserLogin'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.post('/login', [validateLogin], login); // Login
router.post('/signup', [validateSignUp], signUp); // Sign up
router.post('/logout', [validateLoggedUser, logout]); // Logout
router.get('/me', validateLoggedUser, detailsUser); // Get details
router.put('/me', [validateEdit, validateLoggedUser], editUser); // Edit user

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
