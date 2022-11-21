const express = require('express');

const router = express.Router();
const {
  postAdminRole,
  postUserRole,
} = require('../controllers/rolesController');
const { validateAdmin } = require('../middlewares/auth');

router.post('/user', validateAdmin, postUserRole);
router.post('/admin', validateAdmin, postAdminRole);

module.exports = router;
