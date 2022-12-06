/* eslint-disable comma-dangle */
const express = require('express');

const router = express.Router();
const {
  getAllTournaments,
  getActiveTournament,
  getTournament,
  getLeaderBoard,
  addTournament,
  editTournament,
  deleteTournament,
  finishTournament,
} = require('../controllers/tournamentController');

const matchRoutes = require('./match');

const { validateLoggedUser, validateAdmin } = require('../middlewares/auth');
const {
  validateTournamentId,
  validateCreate,
  validateUpdate,
} = require('../validators/tournamentValidator');

/**
 * @openapi
 * /tournament:
 *   get:
 *    tags:
 *    - tournament and matches
 *    summary: Get the information of the current tournament
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      200:
 *        description: (OK) Retrieving tournament info
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tournament'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/', validateLoggedUser, getActiveTournament); // Get tournament in course

/**
 * @openapi
 * /tournament/all:
 *   get:
 *    tags:
 *    - tournament and matches
 *    summary: Get the information of all tournaments
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      200:
 *        description: An array of the tournaments
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Tournament'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/all', validateAdmin, getAllTournaments); // Get all tournaments

/**
 * @openapi
 * /tournament/{tournamentId}:
 *   get:
 *    tags:
 *    - tournament and matches
 *    summary: Get the information of a particular tournament
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament you want to get
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: A JSON with the tournament
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tournament'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

// Get a tournament

router.get(
  '/:tournamentId',
  [validateLoggedUser, validateTournamentId],
  getTournament
);

/**
 * @openapi
 * /tournament/{tournamentId}/leaderboard:
 *   get:
 *    tags:
 *    - tournament and matches
 *    summary: Get the region leaderboard of the tournament
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament you want to get
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: An array of the regional users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: user id
 *                  points:
 *                    type: integer
 *                    description: user points
 *                  data:
 *                    type: array
 *                    description: array with the alias and avatar of the user
 *                    items:
 *                      type: object
 *                      properties:
 *                        alias:
 *                          type: string
 *                          description: alias of the user
 *                        avatar:
 *                          type: string
 *                          description: photo of the user
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

router.get(
  '/:tournamentId/leaderboard',
  [validateLoggedUser, validateTournamentId],
  getLeaderBoard
);

/**
 * @openapi
 * /tournament:
 *   post:
 *    tags:
 *    - tournament and matches
 *    summary: Add a new tournament
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tournament'
 *      required: true
 *    responses:
 *      201:
 *        description: A JSON with the tournament
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tournament'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

router.post('/', [validateAdmin, validateCreate], addTournament); // Add a tournament

/**
 * @openapi
 * /tournament/{tournamentId}:
 *   put:
 *    tags:
 *    - tournament and matches
 *    summary: Update an existing tournament
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament you want to update
 *      required: true
 *      schema:
 *        type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tournament'
 *      required: true
 *    responses:
 *      200:
 *        description: A JSON with the tournament
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tournament'
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/Unauthorized'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

router.put('/:tournamentId', [validateUpdate, validateAdmin], editTournament); // Update a tournament

/**
 * @openapi
 * /tournament/{tournamentId}:
 *   delete:
 *    tags:
 *    - tournament and matches
 *    summary: Delete an existing tournament
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    - name: tournamentId
 *      in: path
 *      description: id of the tournament you want to delete
 *      required: true
 *      schema:
 *        type: string
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

// Delete a tournament
router.delete(
  '/:tournamentId',
  [validateTournamentId, validateAdmin],
  deleteTournament
);

router.put('/:tournamentId/finish', [validateTournamentId, validateAdmin], finishTournament);

router.use('/:tournamentId/match', [validateTournamentId], matchRoutes); // Matches

module.exports = router;
