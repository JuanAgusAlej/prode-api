const express = require('express');

const router = express.Router();

/* import routes */
const tournamentRoutes = require('./tournament');
const matchRoutes = require('./match');

/* add routes */
router.use('/tournament', tournamentRoutes);
router.use('/match', matchRoutes);

module.exports = router;
