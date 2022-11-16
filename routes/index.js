const express = require('express');
const router = express.Router();

/* import routes */
const tournamentRoutes = require('./tournament');
const matchRoutes = require('./match');
const teams = require('./teams');

/* add routes */
router.use('/tournament', tournamentRoutes);
router.use('/match', matchRoutes);
router.use('/teams', teams);

module.exports = router;
