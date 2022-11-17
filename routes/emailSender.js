const express = require('express');
const router = express.Router();
const {
  sendConfirmationEmail,
} = require('../controllers/emailSenderController');

router.post('/', sendConfirmationEmail);

module.exports = router