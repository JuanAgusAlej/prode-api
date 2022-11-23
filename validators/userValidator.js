const { check } = require('express-validator');
const { validateResult } = require('../utils/validate');
const { User } = require('../models');

const validateSignUp = [
  check('name').notEmpty().withMessage('Name is required'),
  check('uid').notEmpty(),
  check('email')
    .isEmail()
    .bail()
    .custom(async (value) => {
      const userExists = await User.findOne({ email: value });
      if (userExists) throw new Error('Email already exists');
    }),
  check('avatar').notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateLogin = [
  check('uid').notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateSignUp,
  validateLogin,
};
