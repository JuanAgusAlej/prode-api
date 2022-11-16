const { post } = require('../services/teams');

const postTeam = (req, res, next) => {
  const { name, country, logo } = req.body;
  //validations with express-validator

  post(req.body)
    .then(savedTeam => {
      res.status(200).send(savedTeam);
    })
    .catch(err => {
      throw new Error(err);
    });
};

module.exports = { postTeam };
