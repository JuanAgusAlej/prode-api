const { validateToken } = require('../utils/tokens');

const validateLoggedUser = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
};

const validateLoggedAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN_ROLE') return res.sendStatus(401);
  next();
};

// Combined middleware to authenticate admin
const validateAdmin = [validateLoggedUser, validateLoggedAdmin];

module.exports = {
  validateLoggedUser,
  validateAdmin,
};
