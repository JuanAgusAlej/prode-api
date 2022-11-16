const { Schema, model } = require('mongoose');

const matchSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  teamAId: {
    type: Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  goalsA: {
    type: Number,
    default: 0,
  },
  teamBId: {
    type: Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  goalsB: {
    type: Number,
    required: true,
  },
  result: {
    type: Array,
    default: true,
  },
});

const Match = model('Match', matchSchema);

module.exports = Match;
