const express = require('express');
const router = express.Router();
const { postTeam } = require('../controllers/teams');

router.post('/', postTeam);

module.exports = router;
