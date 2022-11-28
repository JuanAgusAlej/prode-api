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

router.get('/', validateLoggedUser, getActiveTournament); // Get tournament in course
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
