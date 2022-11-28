/* eslint-disable object-curly-newline */
const { post, getOne, getAll, update, remove } = require('../services/teams');

const postTeam = (req, res, next) => {
  const { name, country, logo, shortName } = req.body;
  post({ name, country, logo, shortName })
    .then((savedTeam) => {
      res.status(201).send(savedTeam);
    })
    .catch((e) => next(e));
};

const getAllTeams = (req, res, next) => {
  getAll()
    .then((teams) => {
      res.status(200).send(teams);
    })
    .catch((err) => {
      next(err);
    });
};

const getTeam = (req, res, next) => {
  const { id } = req.params;

  getOne(id)
    .then((team) => {
      res.status(200).send(team);
    })
    .catch((err) => {
      next(err);
    });
};

const updateTeam = (req, res, next) => {
  const { id } = req.params;
  const { name, country, logo, shortName } = req.body;

  update(id, { name, country, logo, shortName })
    .then((team) => {
      res.status(200).send(team);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteTeam = (req, res, next) => {
  const { id } = req.params;

  remove(id)
    .then(() => {
      res.status(200).send('Successfully removed');
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { postTeam, getTeam, getAllTeams, updateTeam, deleteTeam };
