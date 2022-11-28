const { check, oneOf } = require('express-validator');
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
  check('region')
    .exists()
    .custom((value) => {
      if (!['AR', 'BR', 'US'].includes(value)) {
        throw new Error('Country not allowed');
      }
      return true;
    }),
  check('timezone').custom((value) => {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: value });
      return true;
    } catch (ex) {
      throw new Error('Timezone is not valid');
    }
  }),
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

const validateEdit = [
  check('alias').notEmpty().withMessage('Alias is required'),
  check('avatar').notEmpty().withMessage('Avatar is required'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateEditSettings = [
  oneOf([
    check('push').exists(),
    check('email').exists(),
    check('language').exists(),
  ]),
  check(['push', 'email'])
    .optional()
    .isBoolean()
    .withMessage('Notification status is not invalid'),
  check('language')
    .optional()
    .custom((value) => {
      if (!['ES', 'PT', 'EN'].includes(value)) {
        throw new Error('Language is not valid');
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateSignUp,
  validateLogin,
  validateEdit,
  validateEditSettings,
};
