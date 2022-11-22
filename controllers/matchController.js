const matchService = require('../services/matchService');

const getAllMatches = async (req, res, next) => {
  try {
    const matches = await matchService.getAll();
    res.send(matches);
  } catch (e) {
    next(e);
  }
};

const getMatch = async (req, res, next) => {
  try {
    const match = await matchService.getById(req.params.matchId);
    res.send(match);
  } catch (e) {
    next(e);
  }
};

const addMatch = async (req, res, next) => {
  try {
    const { tournamentId } = req.params;
    const { date, teamAId, teamBId } = req.body;
    const match = await matchService.add({
      date,
      teamAId,
      teamBId,
      tournamentId,
    });
    res.status(201).send(match);
  } catch (e) {
    next(e);
  }
};
const editMatch = async (req, res, next) => {
  try {
    const { date, teamAId, goalsA, teamBId, goalsB, result } = req.body;
    const ModifiedMatch = await matchService.update(req.params.matchId, {
      date,
      teamAId,
      goalsA,
      teamBId,
      goalsB,
      result,
    });
    res.send(ModifiedMatch);
  } catch (e) {
    next(e);
  }
};

const deleteMatch = async (req, res, next) => {
  try {
    const { tournamentId, matchId } = req.params;
    await matchService.deleteOne(tournamentId, matchId);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllMatches,
  getMatch,
  addMatch,
  editMatch,
  deleteMatch,
};
