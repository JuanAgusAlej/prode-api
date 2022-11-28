const express = require('express');

const router = express.Router();
const {
  getAllTeams,
  getTeam,
  postTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/teamsController');

const { validateAdmin, validateLoggedUser } = require('../middlewares/auth');
const { validateMongoId } = require('../validators/mongoValidator');
const {
  validateCreate,
  validateUpdate,
} = require('../validators/teamValidations');

router.get('/', [validateAdmin], getAllTeams);
router.get('/:id', [validateLoggedUser, validateMongoId], getTeam);
router.post('/', [validateAdmin, validateCreate], postTeam);
router.put('/:id', [validateAdmin, validateUpdate], updateTeam);
router.delete('/:id', [validateAdmin, validateMongoId], deleteTeam);

module.exports = router;
