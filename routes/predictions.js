const express = require('express');

const router = express.Router();
const { generatePrediction } = require('../controllers/predictions');
const { validateLoggedUser } = require('../middlewares/auth');
const { validatePrediction } = require('../validators/predictionValidator');

router.post('/', [validatePrediction, validateLoggedUser], generatePrediction);

module.exports = router;
