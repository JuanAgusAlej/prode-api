const { Team } = require('../models');

const post = team => {
  const newTeam = new Team({
    name: team.name,
    country: team.country,
    logo: team.logo || null,
    shortName: team.shortName
  });
  return newTeam.save();
};

const getOne = id => {
  return Team.findById(id);
};

const update = (id, data) => {
  return Team.findByIdAndUpdate(
    id,
    { $set: data },
    { returnDocument: 'after' }
  );
};

const remove = id => {
    return Team.findByIdAndDelete(id)
}

module.exports = { post, getOne, update, remove };
