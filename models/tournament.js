const { Schema, model } = require("mongoose");

const tournamentSchema = new Schema({
  name: String,
  matchesId: Array,
  quantityTeams: Number,
  predictionResultPoints: Number,
  preditionGoalsPoints: Number,
  prizes: Array,
  region: String,
});

const Tournament = model("Tournament", tournamentSchema);

module.exports = Tournament;
