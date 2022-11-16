const express = require('express');
const router = express.Router();

/* import routes */
const tournamentRoutes = require('./tournament');
const teams = require('./teams');

/* add routes */
router.use('/tournament', tournamentRoutes);
router.use('/teams', teams);

module.exports = router;
