const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  logo: String,
  shortName: {
    type: String,
    required: true,
  }
});

const Team = model('Team', teamSchema);

module.exports = Team;
