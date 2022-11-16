const express = require('express');
const router = express.Router();

/* import routes */
const predictionRoute = require("./predictions");
const tournamentRoutes = require('./tournament');
const matchRoutes = require('./match');
const teams = require('./teams');

/* add routes */
router.use('/tournament', tournamentRoutes);
router.use('/match', matchRoutes);
router.use('/teams', teams);
router.use("/predi", predictionRoute);

module.exports = router;
