/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
const { Tournament, Prediction } = require('../models');
const Match = require('../models/Match');
const { sendNotificationEmail } = require('../utils/emails');
const { sendNotification } = require('../utils/notifications');
const { calculatePoints } = require('../utils/points');
const metricService = require('./metricService');

const getAll = async (tournamentId = null) => {
  if (tournamentId === null) {
    return Match.find().populate(['teamAId', 'teamBId']);
  } else {
    const { matchesId } = await Tournament.findById(tournamentId).populate({
      path: 'matchesId',
      populate: ['teamAId', 'teamBId']
    });
    console.log('asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(matchesId);

    return matchesId;
  }
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
  let result;
  if (data.goalsA > data.goalsB) result = 'WON_A';
  if (data.goalsA < data.goalsB) result = 'WON_B';
  if (data.goalsA === data.goalsB) result = 'DRAW';

  const match = await Match.findByIdAndUpdate(
    matchId,
    { ...data, result },
    { new: true }
  ).populate('teamAId teamBId');

  const matchTeams = `${match.teamAId.shortName}-${match.teamBId.shortName}`;

  const tournament = await Tournament.findById(tournamentId);
  const userPredictions = await Prediction.find({ matchId }).populate({
    path: 'userId',
    populate: { path: 'settings' },
  });

  // Init calculator
  const getPoints = calculatePoints(
    match,
    tournament.predictionResultPoints,
    tournament.predictionGoalsPoints
  );

  const updateQuery = [];

  // Winner list by points earned
  const notificationUsers = {};
  const emailUsers = {};

  // Email and Push metrics
  const notificationMetrics = [];

  userPredictions.forEach((prediction) => {
    const {
      id: userId,
      email,
      pushTokens,
      settings
    } = prediction.userId;
    const { email: emailActive, push: pushActive } = settings;

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

      if (emailActive) {
        // Notify by email

        // Register metric
        notificationMetrics.push({ userId, action: 'EMAIL_NOTIFICATION' });

        if (emailUsers[pointsEarned]) {
          emailUsers[pointsEarned].push(email);
        } else {
          emailUsers[pointsEarned] = [email];
        }
      }

      // Push to winner list
      if (pushActive && Array.isArray(pushTokens) && pushTokens.length > 0) {
        // Register metric
        notificationMetrics.push({ userId, action: 'PUSH_NOTIFICATION' });

        pushTokens.forEach((token) => {
          // Push all user's devices
          if (notificationUsers[pointsEarned]) {
            notificationUsers[pointsEarned].push(token);
          } else {
            notificationUsers[pointsEarned] = [token];
          }
        });
      }
    }
  });

  // Set predictions points
  await Prediction.bulkWrite(updateQuery);

  // Send push notification to winners
  if (Object.keys(notificationUsers).length > 0) {
    sendNotification('CORRECT_PREDICTION', {
      notifications: notificationUsers,
      match: matchTeams,
    });
  }

  // Send email notification to winners
  if (Object.keys(emailUsers).length > 0) {
    sendNotificationEmail('CORRECT_PREDICTION', {
      emails: emailUsers,
      match: matchTeams,
    });
  }

  /*
    Save metric
      - PUSH NOTIFICATION
      - EMAIL NOTIFICATION
  */
  await metricService.addMany(notificationMetrics);

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
