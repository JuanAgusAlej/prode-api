const { check } = require('express-validator');
const { validateResult } = require('../utils/validate');
const { Match } = require('../models');

const validatePrediction = [
  check(['goalsA', 'goalsB'])
    .exists()
    .isInt()
    .withMessage('Goal prediction must be a number'),
  check('matchId')
    .exists()
    .isMongoId()
    .bail()
    .withMessage('Invalid Match')
    .custom(async (value) => {
      const matchExists = await Match.findById(value);
      if (!matchExists) throw new Error("Match doesn't exist");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validatePrediction,
};
