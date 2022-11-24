const { Tournament } = require('../models');
const Match = require('../models/Match');

const getAll = () => {
  return Match.find().populate(['teamAId', 'teamBId']);
};

const getById = (id) => {
  return Match.findById(id);
};

const add = async (data) => {
  const match = await Match.create(data);
  const tournament = await Tournament.findById(data.tournamentId);

  tournament.matchesId = [...tournament.matchesId, match.id];
  await tournament.save();

  return match;
};

const update = (id, data) => {
  return Match.findByIdAndUpdate(id, data, { new: true });
};

const setResults = (id, data) => {
  return Match.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = async (tournamentId, matchId) => {
  const match = await Match.findByIdAndDelete(matchId);
  const tournament = await Tournament.findById(tournamentId);

  tournament.matchesId = tournament.matchesId.filter(
    (matchFiltered) => matchFiltered._id.toString() !== matchId
  );

  await tournament.save();

  return match;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  setResults,
  deleteOne,
};
