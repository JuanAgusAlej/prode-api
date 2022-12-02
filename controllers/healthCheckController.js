const healthChecker = (req, res) => {
  res.send(new Date());
};

module.exports = { healthChecker };
