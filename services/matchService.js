const Match = require('../models/Match');

const getAll = () => {
  return Match.find().populate(['teamAId', 'teamBId']);
};

const getById = id => {
  return Match.findById(id);
};

const add = data => {
  return Match.create(data);
};

const update = (id, data) => {
  return Match.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = id => {
  return Match.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteOne,
};
