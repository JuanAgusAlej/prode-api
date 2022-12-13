const express = require('express');

const router = express.Router();

/* import routes */
const predictionRoute = require('./predictions');
const tournamentRoutes = require('./tournament');
const teamsRoutes = require('./teams');
const rolesRoutes = require('./roles');
const userRoutes = require('./user');
const metricsRoutes = require('./metrics');
const healthCheck = require('./healthCheck');

/* add routes */
router.use('/tournament', tournamentRoutes);
router.use('/teams', teamsRoutes);
router.use('/prediction', predictionRoute);
router.use('/roles', rolesRoutes);
router.use('/user', userRoutes);
router.use('/metrics', metricsRoutes);
router.use('/healthcheck', healthCheck);

module.exports = router;
