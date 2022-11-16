const { Schema, model } = require('mongoose');

const logSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
  },
});

const Log = model('Log', logSchema);

module.exports = Log;
