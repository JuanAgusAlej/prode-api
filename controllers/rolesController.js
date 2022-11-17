const { Role } = require('../models');

const postAdminRole = (req, res, next) => {
  const role = new Role({
    rol: 'ADMIN_ROLE',
  });
  role.save().then(savedRole => res.send(savedRole));
};

const postUserRole = (req, res, next) => {
    const role = new Role();
    role.save().then(savedRole => res.send(savedRole));
  }

module.exports = { postAdminRole, postUserRole };
