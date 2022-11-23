const { Schema, model } = require('mongoose');

const tournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  matchesId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Match',
      required: true,
    },
  ],
  quantityTeams: {
    type: Number,
    required: true,
  },
  predictionResultPoints: {
    type: Number,
    required: true,
  },
  predictionGoalsPoints: {
    type: Number,
    required: true,
  },
  prizes: {
    type: Array,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});

const Tournament = model('Tournament', tournamentSchema);

module.exports = Tournament;
