const express = require('express');
const router = express.Router();

/* import routes */
const predictionRoute = require('./predictions');
const tournamentRoutes = require('./tournament');
const matchRoutes = require('./match');
const teamsRoutes = require('./teams');
const rolesRoutes = require('./roles');

/* add routes */
router.use('/tournament', tournamentRoutes);
router.use('/match', matchRoutes);
router.use('/teams', teamsRoutes);
router.use('/predi', predictionRoute);
router.use('/roles', rolesRoutes);

module.exports = router;
