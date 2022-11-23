const express = require('express');
const {
  getAllMatches,
  getMatch,
  addMatch,
  editMatch,
  deleteMatch,
} = require('../controllers/matchController');

const router = express.Router({ mergeParams: true });
const { validateAdmin, validateLoggedUser } = require('../middlewares/auth');

// Get all matches
router.get('/', validateLoggedUser, getAllMatches);

// Get a match
router.get('/:matchId', validateLoggedUser, getMatch);

// Add a match
router.post('/', addMatch);

// Update a match
router.put('/:matchId', validateAdmin, editMatch);

// Delete a match
router.delete('/:matchId', validateAdmin, deleteMatch);

module.exports = router;
