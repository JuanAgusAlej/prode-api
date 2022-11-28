const { Log } = require('../models');

const newLog = (userId, action, value) => {
  return Log.create({ userId, action, value });
};

module.exports = { newLog };
