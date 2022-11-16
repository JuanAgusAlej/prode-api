const { post, getOne, update, remove } = require('../services/teams');

const postTeam = (req, res, next) => {
  const { name, country, logo } = req.body;
  //validations with express-validator

  post(req.body)
    .then(savedTeam => {
      res.status(201).send(savedTeam);
    })
    .catch(err => {
      //use next when handlingErrors's middleware is available
      throw new Error(err);
    });
};

const getTeam = (req, res, next) => {
  const { id } = req.params;
  //validations with express-validator

  getOne(id)
    .then(team => {
      res.status(200).send(team);
    })
    .catch(err => {
      //use next when handlingErrors's middleware is available
      throw new Error(err);
    });
};

const updateTeam = (req, res, next) => {
  const { id } = req.params;
  //validations with express-validator

  update(id, req.body)
    .then(team => {
      res.status(200).send(team);
    })
    .catch(err => {
      //use next when handlingErrors's middleware is available
      throw new Error(err);
    });
};

const deleteTeam = (req, res, next) => {
  const { id } = req.params;
  //validations with express-validator

  remove(id)
    .then(deletedTeam => {
      res.status(200).send('Successfully removed');
    })
    .catch(err => {
      //use next when handlingErrors's middleware is available
      throw new Error(err);
    });
};

module.exports = { postTeam, getTeam, updateTeam, deleteTeam };
