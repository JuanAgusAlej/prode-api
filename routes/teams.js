const express = require('express');

const router = express.Router();
const {
  postTeam,
  getTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamsController');

const { validateAdmin, validateLoggedUser } = require('../middlewares/auth');

router.get('/:id', validateLoggedUser, getTeam);
router.post('/', validateAdmin, postTeam);
router.put('/:id', validateAdmin, updateTeam);
router.delete('/:id', validateAdmin, deleteTeam);

module.exports = router;
