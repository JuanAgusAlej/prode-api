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
    enum: ['WON_A', 'WON_B', 'DRAW'],
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

predictions.pre('save', function (next) {
  const setPick = () => {
    if (this.goalsA > this.goalsB) return 'WON_A';
    if (this.goalsA < this.goalsB) return 'WON_B';
    if (this.goalsA === this.goalsB) return 'DRAW';
  };
  this.pick = setPick();
  next();
});

const Prediction = model('Prediction', predictions);

module.exports = Prediction;
