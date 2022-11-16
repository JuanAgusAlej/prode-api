const Tournament = require('../models/tournament');

const getAll = () => {
  return Tournament.find();
};

const getById = (id) => {
  return Tournament.findById(id);
};

const add = (data) => {
  return Tournament.create(data);
};

const update = (id, data) => {
  return Tournament.findByIdAndUpdate(id, data, { new: true });
};

const deleteOne = (id) => {
  return Tournament.findByIdAndDelete(id);
};

module.exports = { getAll, getById, add, update, deleteOne };
