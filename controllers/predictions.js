const { User, Match } = require("../models");
const { createPred } = require("../services/predictions");

const generatePrediction = async (req, res) => {
  const { goalsA, goalsB, pick, matchId, userId } = req.body;
  //hacer validations
  try {
    const user = await User.findById(userId); //usar service de user
    const match = await Match.findById(matchId); //usar service de match
    const pred = await createPred(goalsA, goalsB, pick, user, match);
    res.status(200).send(pred);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { generatePrediction };
