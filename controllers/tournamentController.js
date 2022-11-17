const tournamentService = require('../services/tournamentService');

const getAllTournaments = async (req, res, next) => {
  try {
    const tournaments = await tournamentService.getAll();
    res.send(tournaments);
  } catch (e) {
    next(e);
  }
};

const getTournament = async (req, res, next) => {
  try {
    const tournament = await tournamentService.getById(req.params.id);
    res.send(tournament);
  } catch (e) {
    next(e);
  }
};

const addTournament = async (req, res, next) => {
  try {
    const {
      name,
      matchesId,
      quantityTeams,
      predictionResultPoints,
      predictionGoalsPoints,
      prizes,
      region,
    } = req.body;
    const tournament = await tournamentService.add({
      name,
      matchesId,
      quantityTeams,
      predictionResultPoints,
      predictionGoalsPoints,
      prizes,
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
      quantityTeams,
      predictionResultPoints,
      predictionGoalsPoints,
      prizes,
      region,
    } = req.body;

    const ModifiedTournament = await tournamentService.update(req.params.id, {
      name,
      matchesId,
      quantityTeams,
      predictionResultPoints,
      predictionGoalsPoints,
      prizes,
      region,
    });
    res.send(ModifiedTournament);
  } catch (e) {
    next(e);
  }
};

const deleteTournament = async (req, res, next) => {
  try {
    await tournamentService.deleteOne(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllTournaments,
  getTournament,
  addTournament,
  editTournament,
  deleteTournament,
};