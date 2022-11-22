const { Schema, model } = require('mongoose');

const predictions = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  matchId: {
    type: Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
  goalsA: {
    type: Number,
    required: true,
  },
  goalsB: {
    type: Number,
    required: true,
  },
  pick: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  points: {
    type: Number,
    default: 0,
  },
});

const Prediction = model('Prediction', predictions);

module.exports = Prediction;
