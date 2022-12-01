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
  teamsId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
  ],
  predictionResultPoints: {
    type: Number,
    default: 3,
  },
  predictionGoalsPoints: {
    type: Number,
    default: 5,
  },
  prizes: {
    type: Array,
    required: true,
  },
  region: {
    type: String,
    enum: ['AR', 'BR', 'US'],
    required: true,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});

const Tournament = model('Tournament', tournamentSchema);

module.exports = Tournament;
