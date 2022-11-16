const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  name: String,
  country: String,
  logo: String,
});

const Team = model('Team', teamSchema);

module.exports = Team;
