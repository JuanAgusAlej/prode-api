const { Schema, model } = require('mongoose');

const metricSchema = new Schema({
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
    type: String,
  },
});

const Metric = model('Metric', metricSchema);

module.exports = Metric;
