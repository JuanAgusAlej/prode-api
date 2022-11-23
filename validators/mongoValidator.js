const { check } = require('express-validator');
const { validateResult } = require('../utils/validate');

const validateMongoId = [
  check('id').notEmpty().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateMongoId,
};
