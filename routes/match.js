const express = require('express');
const {
  getAllMatches,
  getMatch,
  addMatch,
  editMatch,
  deleteMatch,
} = require('../controllers/matchController');

const router = express.Router();

// Get all matches
router.get('/', getAllMatches);

// Get a match
router.get('/:id', getMatch);

// Add a match
router.post('/', addMatch);

// Update a match
router.put('/:id', editMatch);

// Delete a match
router.delete('/:id', deleteMatch);

module.exports = router;
