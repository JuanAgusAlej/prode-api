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
    const match = await matchService.getById(req.params.id);
    res.send(match);
  } catch (e) {
    next(e);
  }
};

const addMatch = async (req, res, next) => {
  try {
    const { date, teamAId, teamBId } = req.body;
    const match = await matchService.add({
      date,
      teamAId,
      teamBId,
    });
    res.status(201).send(match);
  } catch (e) {
    next(e);
  }
};
const editMatch = async (req, res, next) => {
  try {
    const {
      date,
      teamAId,
      goalsA,
      teamBId,
      goalsB,
      result,
    } = req.body;
    const ModifiedMatch = await matchService.update(req.params.id, {
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
    await matchService.deleteOne(req.params.id);
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
