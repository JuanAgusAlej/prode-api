const { Schema, model } = require('mongoose');

const matchSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  teamAId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  goalsA: {
    type: Number,
    default: 0,
  },
  teamBId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  goalsB: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    default: true,
  },
  predictionsId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Prediction',
    },
  ],
});

const Match = model('Match', matchSchema);

module.exports = Match;
