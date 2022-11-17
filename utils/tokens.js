const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, process.env.TOKEN_PASSPHRASE, {
    expiresIn: '5d',
  });
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_PASSPHRASE);
};

module.exports = { generateToken, validateToken };
