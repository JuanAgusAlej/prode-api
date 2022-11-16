import mongoose from "mongoose";
const { Schema } = mongoose;

const Predictions = new Schema({
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

module.exports = Predictions;
