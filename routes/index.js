const express = require('express');

const router = express.Router();

/* import routes */
const tournamentRoutes = require('./tournament');

/* add routes */
router.use('/tournament', tournamentRoutes);

module.exports = router;
