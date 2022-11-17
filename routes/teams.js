const express = require('express');
const router = express.Router();
const { postTeam, getTeam, updateTeam, deleteTeam } = require('../controllers/teamsController');

router.post('/', postTeam);

router.get('/:id', getTeam);

router.put('/:id', updateTeam);

router.delete('/:id', deleteTeam)

module.exports = router;
