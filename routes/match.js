const express = require('express');
const {
  getAllMatches,
  getMatch,
  addMatch,
  editMatch,
  setResults,
  deleteMatch,
} = require('../controllers/matchController');

const router = express.Router({ mergeParams: true });
const { validateAdmin, validateLoggedUser } = require('../middlewares/auth');

// Get all matches
router.get('/', validateLoggedUser, getAllMatches);

// Get a match
router.get('/:matchId', validateLoggedUser, getMatch);

// Add a match
router.post('/', validateAdmin, addMatch);

// Update a match
router.put('/:matchId', validateAdmin, editMatch);

// Set results
router.put('/:matchId/results', validateAdmin, setResults);

// Delete a match
router.delete('/:matchId', validateAdmin, deleteMatch);

module.exports = router;
