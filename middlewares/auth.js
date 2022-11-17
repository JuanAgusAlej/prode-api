const { validateToken } = require('../utils/tokens');

function validateLoggedUser(req, res, next) {
  const token = req.header('token');
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}

module.exports = {
  validateLoggedUser,
};
