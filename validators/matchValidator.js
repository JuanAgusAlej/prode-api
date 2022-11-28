/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
const { check } = require('express-validator');
const { Team, Match } = require('../models');
const { validateResult } = require('../utils/validate');

const validateReusable = [
  check('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Date is not valid'),
  check(['teamAId', 'teamBId'])
    .optional()
    .isMongoId()
    .withMessage('TeamId must be a valid Team ID')
    .custom(async (value, { req }) => {
      if (req.body.teamAId === req.body.teamBId) {
        throw new Error('TeamA and TeamB cannot be equals');
      }

      const teamExists = await Team.findOne({ _id: value });
      if (!teamExists) throw new Error("Team doesn't exist");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateCreate = [
  check('date').exists().withMessage('Date is required'),
  check(['teamAId', 'teamBId']).exists().withMessage('Team is required'),
  validateReusable,
];

const validateUpdate = [
  validateReusable,
  check(['teamAId', 'teamBId'])
    .optional()
    .custom(async (value, { req, path }) => {
      const { matchId } = req.params;
      const match = await Match.findOne({ _id: matchId });
      if (
        (path === 'teamAId' && match.teamBId.toString() === value) ||
        (path === 'teamBId' && match.teamAId.toString() === value)
      ) {
        throw new Error('Teams cannot be equals');
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateSetResults = [
  check(['goalsA', 'goalsB'])
    .exists()
    .withMessage('Goals are required')
    .bail()
    .isInt()
    .withMessage('Goal result must be a number')
    .bail()
    .isInt({ min: 0 })
    .withMessage('Goal result cannot be a negative number'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateMatchId = [
  check('matchId').notEmpty().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = {
  validateMatchId,
  validateCreate,
  validateUpdate,
  validateSetResults,
};
