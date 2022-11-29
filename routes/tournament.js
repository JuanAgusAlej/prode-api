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
 *    - tournament
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
 *    - tournament
 *    summary: Get the information of all tournaments
 *    parameters:
 *    - $ref: '#/components/parameters/token'
 *    responses:
 *      200:
 *        description: A JSON array of the tournaments
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

// Get a tournament
router.get(
  '/:tournamentId',
  [validateLoggedUser, validateTournamentId],
  getTournament
);

router.get(
  '/:tournamentId/leaderboard',
  [validateLoggedUser, validateTournamentId],
  getLeaderBoard
);

router.post('/', [validateAdmin, validateCreate], addTournament); // Add a tournament
router.put('/:tournamentId', [validateUpdate, validateAdmin], editTournament); // Update a tournament

// Delete a tournament
router.delete(
  '/:tournamentId',
  [validateTournamentId, validateAdmin],
  deleteTournament
);

router.use('/:tournamentId/match', [validateTournamentId], matchRoutes); // Matches

module.exports = router;
