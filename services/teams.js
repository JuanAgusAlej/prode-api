const { Team } = require('../models');

const post = team => {
  const newTeam = new Team({
    name: team.name,
    country: team.country,
    logo: team.logo || null,
  });
  return newTeam.save();
};

module.exports = { post };
