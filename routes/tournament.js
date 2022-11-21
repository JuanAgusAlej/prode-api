const express = require('express');

const router = express.Router();
const {
  getAllTournaments,
  getTournament,
  addTournament,
  editTournament,
  deleteTournament,
} = require('../controllers/tournamentController');

const { validateLoggedUser, validateAdmin } = require('../middlewares/auth');

// Get all tournaments
router.get('/', validateLoggedUser, getAllTournaments);

// Get a tournament
router.get('/:id', validateLoggedUser, getTournament);

// Add a tournament
router.post('/', validateAdmin, addTournament);

// Update a tournament
router.put('/:id', validateAdmin, editTournament);

// Delete a tournament
router.delete('/:id', validateAdmin, deleteTournament);

module.exports = router;
