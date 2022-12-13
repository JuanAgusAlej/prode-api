const express = require('express');

const router = express.Router();
const { healthChecker } = require('../controllers/healthCheckController');

router.get('/', healthChecker);

module.exports = router;
