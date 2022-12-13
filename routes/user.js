/* eslint-disable comma-dangle */
const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getUser,
  editUser,
  editUserSettings,
  changeStatus,
  changeRole,
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
 */
router.post('/signup', [validateSignUp], signUp); // Sign up

/**
 * @openapi
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
 */
router.post('/login', [validateLogin], login); // Login

/**
 * @openapi
 * /user/logout:
 *  post:
 *    tags:
 *    - users
 *    summary: create a log for logout action
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      204:
 *        description: (OK)
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.post('/logout', [validateLoggedUser, logout]); // Logout

/**
 * @openapi
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
 *              $ref: '#/components/schemas/BodyUser'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/me', validateLoggedUser, detailsUser); // Get details

/**
 * @openapi
 * /users/me:
 *  put:
 *    tags:
 *    - users
 *    summary: edit alias or avatar of logged user
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              avatar:
 *                type: string
 *                description: pathfile of an image
 *              alias:
 *                type: string
 *                description: an alias to identify the user in the app
 *      required: true
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BodyUser'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.put('/me', [validateEdit, validateLoggedUser], editUser); // Edit user

/**
 * @openapi
 * /users/me/push:
 *  put:
 *    tags:
 *    - users
 *    summary: set the token to allow the user to receive push notifications
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *      required: true
 *    responses:
 *      204:
 *        description: (OK)
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.put('/me/push', [validateLoggedUser], setPushToken); // Set push token

/**
 * @openapi
 * /user/me/settings:
 *  put:
 *    tags:
 *    - users
 *    summary: edit notifications and language of logged user
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: boolean
 *                description: indicates if the user allow notification through email
 *              push:
 *                type: boolean
 *                description: indicates if the user allow notification through push
 *              language:
 *                type: string
 *                description: language automatically set by the region or manually by the user
 *      required: true
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BodySettings'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
// Edit settings
router.put(
  '/me/settings',
  [validateEditSettings, validateLoggedUser],
  editUserSettings
);

/*
 * Admin endpoints *
 */

/**
 * @openapi
 * /user:
 *  get:
 *    tags:
 *    - users
 *    summary: get all users (only admin)
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              description: array with all the users
 *              items:
 *                $ref: '#/components/schemas/ResponseUserAdmin'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/', validateAdmin, getAllUsers); // Get all users

/**
 * @openapi
 * /user/{userId}:
 *  get:
 *    tags:
 *    - users
 *    summary: get a user (only admin)
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: userId
 *      in: path
 *      description: id of the user you want to get
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseUserAdmin'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/:id', [validateMongoId, validateAdmin], getUser); // Get a user

/**
 * @openapi
 * /user/{userId}/status:
 *  put:
 *    tags:
 *    - users
 *    summary: change status of a user (only admin)
 *    description: if status is true will be false and vice versa
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: userId
 *      in: path
 *      description: id of the user you want to change
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseUserAdmin'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.put('/:id/status', [validateMongoId, validateAdmin], changeStatus); // Change status

/**
 * @openapi
 * /user/{userId}/role:
 *  put:
 *    tags:
 *    - users
 *    summary: change role of a user (only admin)
 *    description: if the role is USER_ROLE will be ADMIN_ROLE and vice versa
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: userId
 *      in: path
 *      description: id of the user you want to change
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: (OK)
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseUserAdmin'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.put('/:id/role', [validateMongoId, validateAdmin], changeRole); // Change role
module.exports = router;
