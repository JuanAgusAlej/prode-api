const { check } = require('express-validator');
const { validateResult } = require('../utils/validate');
const { Match } = require('../models');

const validatePrediction = [
  check(['goalsA', 'goalsB'])
    .exists()
    .withMessage('Goal prediction is required')
    .bail()
    .isInt()
    .withMessage('Goal prediction must be a number')
    .bail()
    .isInt({ min: 0 })
    .withMessage('Goal prediction cannot be a negative number'),
  check('matchId')
    .exists()
    .isMongoId()
    .bail()
    .withMessage('Invalid Match')
    .custom(async (value) => {
      const match = await Match.findById(value);
      if (!match) throw new Error("Match doesn't exist");

      const actualDate = new Date();
      const matchDate = match.date;
      const minutesDiff = Math.abs(
        Math.round((actualDate - matchDate) / 60000)
      );
      if (minutesDiff < 120) throw new Error('The countdown to play is over');
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validatePrediction,
};
