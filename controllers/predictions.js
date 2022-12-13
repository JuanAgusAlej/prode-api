/* eslint-disable no-underscore-dangle */
const { createPred } = require('../services/predictions');

const generatePrediction = async (req, res) => {
  const { goalsA, goalsB, matchId } = req.body;
  const userId = req.user.id;

  try {
    const pred = await createPred(goalsA, goalsB, userId, matchId);
    res.status(201).send(pred);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { generatePrediction };
