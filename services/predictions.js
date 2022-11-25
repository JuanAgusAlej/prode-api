/* eslint-disable no-underscore-dangle */
const { User, Match, Prediction } = require('../models');

const createPred = async (goalsA, goalsB, userId, matchId) => {
  const prediction = await Prediction.findOne({ matchId, userId });
  const user = await User.findById(userId);
  const match = await Match.findById(matchId);

  if (!prediction) {
    // Create prediction
    const newPred = new Prediction({
      goalsA,
      goalsB,
      matchId,
      userId,
    });

    const lastPred = await newPred.save();

    user.predictionsId = user.predictionsId.concat(lastPred._id);
    await user.save();
    match.predictionsId = match.predictionsId.concat(lastPred._id);
    await match.save();
    return lastPred;
  } else {
    // Update prediction
    const setPick = () => {
      if (goalsA > goalsB) return 'WON_A';
      if (goalsA < goalsB) return 'WON_B';
      if (goalsA === goalsB) return 'DRAW';
    };
    const predictionModified = await Prediction.findByIdAndUpdate(
      prediction._id,
      {
        goalsA,
        goalsB,
        pick: setPick(),
      },
      { new: true }
    );
    return predictionModified;
  }
};

module.exports = { createPred };
