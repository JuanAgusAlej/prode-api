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
    required: true,
  },
  goalsB: {
    type: Number,
    default: 0,
  },
  result: {
    type: String,
    enum: ['PENDING', 'WON_A', 'WON_B', 'DRAW'],
    default: 'PENDING',
  },
  instance: {
    type: String,
    required: true,
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
