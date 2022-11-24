/* eslint-disable no-underscore-dangle */
const { User, Match, Prediction } = require('../models');

const createPred = async (goalsA, goalsB, userId, matchId) => {
  const newPred = new Prediction({
    goalsA,
    goalsB,
    matchId,
    userId,
  });
  try {
    const lastPred = await newPred.save();
    const user = await User.findById(userId); //  usar service de user
    const match = await Match.findById(matchId); // usar service de match
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
