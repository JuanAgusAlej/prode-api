/* eslint-disable comma-dangle */
const express = require('express');
const { newMetric, getMetrics } = require('../controllers/metricController');

const router = express.Router();
const { validateAdmin, validateLoggedUser } = require('../middlewares/auth');
const { validateMetric } = require('../validators/metricValidator');

router.get('/', [validateAdmin], getMetrics);
router.post('/', [validateLoggedUser, validateMetric], newMetric);

module.exports = router;
