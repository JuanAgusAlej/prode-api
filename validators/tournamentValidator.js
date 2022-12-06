/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const { check } = require('express-validator');
const { validateResult } = require('../utils/validate');
const { Tournament, Team } = require('../models');

const validateReusable = [
  check('name').optional(),
  check('teamsId')
    .optional()
    .isArray()
    .withMessage('Teams must be a list')
    .bail()
    .custom(async (teams) => {
      if (teams.length < 2) {
        throw new Error('Teams must be a list with at least two teams');
      }

      teams.forEach((team) => {
        if (!mongoose.isValidObjectId(team)) {
          throw new Error('One of the teams is invalid');
        }
      });

      const teamsExists = await Team.find({
        _id: { $in: teams.map((id) => new mongoose.Types.ObjectId(id)) },
      });

      if (teams.length !== teamsExists.length) {
        throw new Error("One of the teams doesn't exist");
      }
    }),
  check(['predictionResultPoints', 'predictionGoalsPoints'])
    .optional()
    .exists()
    .isInt()
    .withMessage('Prediction points must be a number'),
  check('region')
    .optional()
    .isIn(['AR', 'BR', 'US'])
    .withMessage('Region is not valid')
    .custom(async (value, { req }) => {
      const tournamentExists = await Tournament.findOne({
        finished: false,
        region: value,
      });

      if (tournamentExists && tournamentExists.id !== req.params.tournamentId) {
        throw new Error(
          'There is already a tournament in progress in this region'
        );
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateCreate = [
  check('name').exists().notEmpty().withMessage('Name is required'),
  check('teamsId').exists().withMessage('Teams are required'),
  check('region').exists().withMessage('Region is required'),
  validateReusable,
];

const validateUpdate = [
  check('tournamentId').notEmpty().isMongoId(),
  validateReusable,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateTournamentId = [
  check('tournamentId')
    .notEmpty()
    .isMongoId()
    .withMessage('Tournament is invalid'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
module.exports = {
  validateCreate,
  validateUpdate,
  validateTournamentId,
};
