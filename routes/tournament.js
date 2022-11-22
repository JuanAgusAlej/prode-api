const express = require('express');

const router = express.Router();
const {
  getAllTournaments,
  getTournament,
  addTournament,
  editTournament,
  deleteTournament,
} = require('../controllers/tournamentController');

const matchRoutes = require('./match');

const { validateLoggedUser, validateAdmin } = require('../middlewares/auth');

// Get all tournaments
router.get('/', validateLoggedUser, getAllTournaments);

// Get a tournament
router.get('/:tournamentId', validateLoggedUser, getTournament);

// Add a tournament
router.post('/', validateAdmin, addTournament);

// Update a tournament
router.put('/:tournamentId', validateAdmin, editTournament);

// Delete a tournament
router.delete('/:tournamentId', validateAdmin, deleteTournament);

// Matches
router.use('/:tournamentId/match', matchRoutes);

module.exports = router;
