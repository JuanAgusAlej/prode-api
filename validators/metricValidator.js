/* eslint-disable operator-linebreak */
const { check } = require('express-validator');
const { validateResult } = require('../utils/validate');

const validateMetric = [
  check('action')
    .notEmpty()
    .withMessage('Action is required')
    .bail()
    .isIn(['PAGEVIEW', 'ACTIVE'])
    .withMessage('Invalid action'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
  check('value').custom((value, { req }) => {
    if (req.body.action === 'PAGEVIEW' && !value) {
      throw new Error('Value is required');
    } else {
      return true;
    }
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateMetric };
