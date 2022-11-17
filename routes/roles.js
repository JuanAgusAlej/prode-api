const express = require('express');
const router = express.Router();
const { postAdminRole, postUserRole } = require('../controllers/rolesController');

router.post('/user', postUserRole);

router.post('/admin', postAdminRole);

module.exports = router;
