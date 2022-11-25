/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
const { default: mongoose } = require('mongoose');
const { Tournament, Prediction } = require('../models');
const Match = require('../models/Match');
const { calculatePoints } = require('../utils/points');

const getAll = () => {
  return Match.find().populate(['teamAId', 'teamBId']);
};

const getById = (id) => {
  return Match.findById(id);
};

const add = async (data) => {
  const match = await Match.create(data);
  const tournament = await Tournament.findById(data.tournamentId);

  tournament.matchesId = [...tournament.matchesId, match.id];
  await tournament.save();

  return match;
};

const update = (id, data) => {
  return Match.findByIdAndUpdate(id, data, { new: true });
};

const setResults = async (matchId, tournamentId, data) => {
  const match = await Match.findByIdAndUpdate(matchId, data, { new: true });
  const tournament = await Tournament.findById(tournamentId);
  const userPredictions = await Prediction.find({ matchId });

  // Init calculator
  const getPoints = calculatePoints(
    match,
    tournament.predictionResultPoints,
    tournament.predictionGoalsPoints
  );

  const updateQuery = [];

  userPredictions.forEach((prediction) => {
    const pointsEarned = getPoints(prediction);
    if (pointsEarned > 0) {
      const updatePrediction = {
        updateOne: {
          filter: { _id: prediction._id },
          update: {
            state: true,
            points: pointsEarned,
          },
        },
      };

      updateQuery.push(updatePrediction);
    }
  });

  await Prediction.bulkWrite(updateQuery);
  return match;
};

const deleteOne = async (tournamentId, matchId) => {
  const match = await Match.findByIdAndDelete(matchId);
  const tournament = await Tournament.findById(tournamentId);

  tournament.matchesId = tournament.matchesId.filter(
    (matchFiltered) => matchFiltered._id.toString() !== matchId
  );

  await tournament.save();

  return match;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  setResults,
  deleteOne,
};
