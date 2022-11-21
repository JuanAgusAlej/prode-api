const express = require('express');

const router = express.Router();
const { generatePrediction } = require('../controllers/predictions');
const { validateLoggedUser } = require('../middlewares/auth');

router.post('/', validateLoggedUser, generatePrediction);

module.exports = router;
