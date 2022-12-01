const metricService = require('../services/metricService');

const getMetrics = async (req, res, next) => {
  try {
    const metrics = await metricService.getAll();
    res.send(metrics);
  } catch (e) {
    next(e);
  }
};

const newMetric = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const { action, value } = req.body;
    const data = { action };
    if (action === 'PAGEVIEW') {
      data.value = value;
    }
    await metricService.add({ ...data, userId });
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
};

module.exports = { getMetrics, newMetric };
