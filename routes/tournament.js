const express = require('express');

const router = express.Router();
const {
  getAllTournaments,
  getTournament,
  addTournament,
  editTournament,
  deleteTournament,
} = require('../controllers/tournamentController');

// Get all tournaments
router.get('/', getAllTournaments);

// Get a tournament
router.get('/:id', getTournament);

// Add a tournament
router.post('/', addTournament);

// Update a tournament
router.put('/:id', editTournament);

// Delete a tournament
router.delete('/:id', deleteTournament);

module.exports = router;
