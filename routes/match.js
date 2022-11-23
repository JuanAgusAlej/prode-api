const express = require('express');
const {
  getAllMatches,
  getMatch,
  addMatch,
  editMatch,
  deleteMatch,
} = require('../controllers/matchController');

const router = express.Router();
const { validateAdmin, validateLoggedUser } = require('../middlewares/auth');

// Get all matches
router.get('/', validateLoggedUser, getAllMatches);

// Get a match
router.get('/:id', validateLoggedUser, getMatch);

// Add a match
router.post('/', addMatch);

// Update a match
router.put('/:id', validateAdmin, editMatch);

// Delete a match
router.delete('/:id', validateAdmin, deleteMatch);

module.exports = router;
