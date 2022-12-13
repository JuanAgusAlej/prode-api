const { check, oneOf } = require('express-validator');
const { validateResult } = require('../utils/validate');

const validateCreate = [
  check('name').notEmpty().withMessage('Name is required'),
  check('country').notEmpty().withMessage('Country is required'),
  check('logo').notEmpty().withMessage('Logo is required'),
  check('shortName').notEmpty().withMessage('Short name is required'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUpdate = [
  check('id').exists().isMongoId().withMessage('Team ID is invalid'),
  oneOf([
    check('name').exists(),
    check('country').exists(),
    check('logo').exists(),
    check('shortName').exists(),
  ]),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreate, validateUpdate };
