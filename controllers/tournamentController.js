const tournamentService = require('../services/tournamentService');

const getAllTournaments = async (req, res, next) => {
  try {
    const tournaments = await tournamentService.getAll();
    res.send(tournaments);
  } catch (e) {
    next(e);
  }
};

const getActiveTournament = async (req, res, next) => {
  try {
    const { region } = req.user;
    const tournament = await tournamentService.getActive(region);
    res.send(tournament);
  } catch (e) {
    next(e);
  }
};

const getTournament = async (req, res, next) => {
  try {
    const tournament = await tournamentService.getById(req.params.tournamentId);
    res.send(tournament);
  } catch (e) {
    next(e);
  }
};

const getLeaderBoard = async (req, res, next) => {
  try {
    const { region } = req.user;
    const { tournamentId } = req.params;
    const leaderboard = await tournamentService.getLeaderBoard(
      tournamentId,
      region,
    );
    res.send(leaderboard);
  } catch (e) {
    next(e);
  }
};

const addTournament = async (req, res, next) => {
  try {
    const {
      name,
      teamsId,
      region,
    } = req.body;
    const tournament = await tournamentService.add({
      name,
      teamsId,
      region,
    });
    res.status(201).send(tournament);
  } catch (e) {
    next(e);
  }
};
const editTournament = async (req, res, next) => {
  try {
    const {
      name,
      matchesId,
      teamsId,
      predictionResultPoints,
      predictionGoalsPoints,
      prizes,
      region,
      finished,
    } = req.body;

    const ModifiedTournament = await tournamentService.update(
      req.params.tournamentId,
      {
        name,
        matchesId,
        teamsId,
        predictionResultPoints,
        predictionGoalsPoints,
        prizes,
        region,
        finished,
      },
    );
    res.send(ModifiedTournament);
  } catch (e) {
    next(e);
  }
};

const deleteTournament = async (req, res, next) => {
  try {
    await tournamentService.deleteOne(req.params.tournamentId);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const finishTournament = async (req, res, next) => {
  try {
    tournamentService.finish(req.params.tournamentId);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllTournaments,
  getTournament,
  getActiveTournament,
  getLeaderBoard,
  addTournament,
  editTournament,
  deleteTournament,
  finishTournament,
};
