const { Schema, model } = require('mongoose');

const logSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
  value: {
    type: Schema.Types.Mixed,
  },
});

const Log = model('Log', logSchema);

module.exports = Log;
