const { default: mongoose } = require('mongoose');
const { User, Prediction } = require('../models');
const Tournament = require('../models/tournament');

const getAll = () => {
  return Tournament.find().populate(['teamsId']);
};

const getActive = (region) => {
  return Tournament.findOne({ finished: false, region });
};

const getById = (id) => {
  return Tournament.findById(id);
};

const getLeaderBoard = async (tournamentId, region) => {
  const users = await User.find({ region }).distinct('_id');
  const matches = await Tournament.find({ id: tournamentId }).distinct(
    'matchesId',
  );

  const predictions = await Prediction.aggregate([
    {
      $match: {
        $and: [
          {
            matchId: {
              $in: matches.map((id) => new mongoose.Types.ObjectId(id)),
            },
          },
          {
            userId: {
              $in: users.map((id) => new mongoose.Types.ObjectId(id)),
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: '$userId',
        points: { $sum: '$points' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'data',
        pipeline: [
          {
            $project: {
              _id: 0,
              alias: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    { $sort: { points: -1 } },
  ]);
  console.log('PREDICTIONSS', predictions);
  return predictions;
};

const add = (data) => {
  return Tournament.create(data);
};

const update = (id, data) => {
  return Tournament.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = (id) => {
  return Tournament.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getActive,
  getById,
  getLeaderBoard,
  add,
  update,
  deleteOne,
};
