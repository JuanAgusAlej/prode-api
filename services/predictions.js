const { Prediction } = require("../models");

const createPred = async (goalsA, goalsB, pick, user, match) => {
  const newPred = new Prediction({
    goalsA,
    goalsB,
    pick,
    matchId: match._id,
    userId: user._id,
  });
  try {
    const lastPred = await newPred.save();
    user.predictionsId = user.predictionsId.concat(lastPred._id);
    await user.save();
    match.predictionsId = match.predictionsId.concat(lastPred._id);
    await match.save();
    return lastPred;
  } catch (error) {
    return error.message;
  }
};

module.exports = { createPred };
