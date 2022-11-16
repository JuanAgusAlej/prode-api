const express = require('express');
const router = express.Router();

/* import routes */
const teams = require('./teams');

/* add routes */
router.use('/teams', teams)

module.exports = router;
