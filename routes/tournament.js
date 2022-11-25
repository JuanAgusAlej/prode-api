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

router.get('/', validateLoggedUser, getActiveTournament); // Get tournament in course
router.get('/all', validateAdmin, getAllTournaments); // Get all tournaments
router.get('/:tournamentId', validateLoggedUser, getTournament); // Get a tournament
router.get('/:tournamentId/leaderboard', validateLoggedUser, getLeaderBoard);

router.post('/', validateAdmin, addTournament); // Add a tournament
router.put('/:tournamentId', validateAdmin, editTournament); // Update a tournament
router.delete('/:tournamentId', validateAdmin, deleteTournament); // Delete a tournament

router.use('/:tournamentId/match', matchRoutes); // Matches

module.exports = router;
