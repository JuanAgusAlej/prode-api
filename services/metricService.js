/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
const { User, Tournament, Match, Prediction } = require('../models');
const Metric = require('../models/Metric');

const getActiveUsers = async () => {
  const todayDate = new Date().getTime();
  const yesterdayDate = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).setHours(0, 0, 0, 0);
  const ActiveUsers = await Metric.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(yesterdayDate),
          $lte: new Date(todayDate),
        },
        action: 'ACTIVE',
      },
    },
    {
      $group: {
        _id: '$userId',
        doc: {
          $first: '$$ROOT',
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: '$doc',
      },
    },
  ]);
  return ActiveUsers;
};

const getAggroupedKPI = async () => {
  const aggroupedMetrics = await Metric.aggregate([
    {
      $match: {
        action: {
          $in: [
            'PAGEVIEW',
            'NEW_BET',
            'PUSH_NOTIFICATION',
            'EMAIL_NOTIFICATION',
            'ACTIVE',
          ],
        },
      },
    },
    {
      $group: {
        _id: '$userId',
        pageview: {
          $sum: {
            $cond: [{ $eq: ['$action', 'PAGEVIEW'] }, 1, 0],
          },
        },
        pushNotification: {
          $sum: {
            $cond: [{ $eq: ['$action', 'PUSH_NOTIFICATION'] }, 1, 0],
          },
        },
        emailNotification: {
          $sum: {
            $cond: [{ $eq: ['$action', 'EMAIL_NOTIFICATION'] }, 1, 0],
          },
        },
        prediction: {
          $sum: {
            $cond: [{ $eq: ['$action', 'NEW_BET'] }, 1, 0],
          },
        },
        minutesOfUse: {
          $sum: {
            $cond: [{ $eq: ['$action', 'ACTIVE'] }, 5, 0],
          },
        },
      },
    },
    {
      $project: {
        pageviews: '$pageview',
        pushNotifications: '$pushNotification',
        emailNotifications: '$emailNotification',
        predictions: '$prediction',
        minutesOfUse: '$minutesOfUse',
      },
    },
  ]);

  return aggroupedMetrics;
};

const calculatorKPI = (data, total) => {
  return (property) => {
    return data.reduce((acc, el) => el[property] + acc, 0) / total;
  };
};

const getAll = async () => {
  const metricObject = { total: {}, kpi: {} };

  /*
   *
   * Users metrics
   *
   * */
  const users = {};
  const usersQuery = await User.find();
  users.total = usersQuery.length;
  users.active = usersQuery.filter((user) => user.state === true).length;
  users.blocked = users.total - users.active;

  // Find active today and yesterday
  const activeUsers = await getActiveUsers();
  const todayDate = new Date();
  users.activeToday = activeUsers.filter((user) => {
    return new Date(user.date).toDateString() === todayDate.toDateString();
  }).length;
  users.activeYesterday = activeUsers.length - users.activeToday;

  /*
   *
   * Tournaments
   *
   */

  const tournaments = {};
  const tournamentsQuery = await Tournament.find();
  tournaments.total = tournamentsQuery.length;
  tournaments.active = tournamentsQuery.filter(
    (tournament) => tournament.finished === false
  ).length;
  tournaments.finished = tournaments.total - tournaments.active;

  /*
   *
   * Matches
   *
   */

  const matches = {};
  const matchesQuery = await Match.find();
  matches.total = matchesQuery.length;
  matches.active = matchesQuery.filter(
    (match) => match.result === 'PENDING'
  ).length;
  matches.finished = matches.total - matches.active;

  /*
   *
   * Predictions
   *
   */

  const predictions = {};
  const predictionsQuery = await Prediction.find();
  predictions.total = predictionsQuery.length;
  predictions.pending = predictionsQuery.filter(
    (prediction) => prediction.result === 'PENDING'
  ).length;
  predictions.won = predictionsQuery.filter(
    (prediction) => prediction.state === true
  ).length;

  predictions.loss = predictionsQuery.filter(
    (prediction) => prediction.state === false
  ).length;

  /*
   *
   * Notifications
   *
   */

  const notifications = {};
  const notificationsQuery = await Metric.find({
    $or: [{ action: 'EMAIL_NOTIFICATION' }, { action: 'PUSH_NOTIFICATION' }],
  });
  notifications.total = notificationsQuery.length;
  notifications.push = notificationsQuery.filter(
    (notification) => notification.action === 'PUSH_NOTIFICATION'
  ).length;
  notifications.email = notifications.total - notifications.push;

  const kpi = {};
  const aggroupedData = await getAggroupedKPI();

  // Init KPI calculator
  const calculateKPI = calculatorKPI(aggroupedData, users.total);

  kpi.pageviewsPerUser = calculateKPI('pageviews').toFixed(2);
  kpi.pushNotificationsPerUser = calculateKPI('pushNotifications').toFixed(2);
  kpi.emailNotificationsPerUser = calculateKPI('emailNotifications').toFixed(2);
  kpi.predictionsPerUser = calculateKPI('predictions').toFixed(2);
  kpi.userPermanence = calculateKPI('minutesOfUse').toFixed(2);
  kpi.predictionsWinRate = (
    (predictions.won / predictions.total) *
    100
  ).toFixed(2);

  /*
   * Add objects to parent object
   */

  // Total
  metricObject.total.users = users;
  metricObject.total.tournaments = tournaments;
  metricObject.total.matches = matches;
  metricObject.total.predictions = predictions;
  metricObject.total.notifications = notifications;

  // KPI
  metricObject.kpi = kpi;

  return metricObject;
};

const add = async (data) => {
  await Metric.create(data);
};

const addMany = async (data) => {
  await Metric.insertMany(data);
};

module.exports = { getAll, add, addMany };
