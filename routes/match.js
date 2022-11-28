/* eslint-disable comma-dangle */
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
const {
  validateMatchId,
  validateCreate,
  validateUpdate,
  validateSetResults,
} = require('../validators/matchValidator');

// Get all matches
router.get('/', validateLoggedUser, getAllMatches);

// Get a match
router.get('/:matchId', [validateLoggedUser, validateMatchId], getMatch);

// Add a match
router.post('/', [validateAdmin, validateCreate], addMatch);

// Update a match
router.put('/:matchId', [validateAdmin, validateUpdate], editMatch);

// Set results
router.put(
  '/:matchId/results',
  [validateAdmin, validateSetResults],
  setResults
);

// Delete a match
router.delete('/:matchId', [validateAdmin, validateMatchId], deleteMatch);

module.exports = router;
