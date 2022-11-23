const { User, Notification } = require('../models');
const { generateToken } = require('../utils/tokens');

const getAll = () => {
  return User.find().populate('');
};

const getById = (id) => {
  return User.findById(id);
};

const login = async (uid) => {
  const user = await User.findOne({ uid })
    .populate('notifications', 'email push -_id')
    .populate('predictionsId');
  if (!user) return;
  const points = await user.getPoints();
  const userData = {
    id: user.id,
    name: user.name,
    alias: user.alias,
    uid: user.uid,
    points,
    email: user.email,
    region: user.region,
    role: user.role,
    state: user.state,
    avatar: user.avatar,
    validated: user.validated,
    predictions: user.predictionsId,
    notifications: user.notifications,
  };

  const tokenPayload = {
    id: user.id,
    uid: user.uid,
    email: user.email,
    region: user.region,
    role: user.role,
    validated: user.validated,
  };
  const token = generateToken(tokenPayload);
  return {
    user: userData,
    token,
  };
};

const signUp = async (data) => {
  const region = 'Argentina'; // Hardcoded temporarily
  const alias = data.alias ? data.alias : data.name;
  const user = await User.create({ ...data, alias, region });
  const notification = await Notification.create({ userId: user.id });
  user.notifications = notification.id;
  await user.save();
  return user;
};

const getLoggedUser = async (id) => {
  const user = await User.findById(id)
    .populate('notifications', 'email push -_id')
    .populate('predictionsId');
  if (!user) return;
  const points = await user.getPoints();
  const userData = {
    id: user.id,
    name: user.name,
    alias: user.alias,
    uid: user.uid,
    points,
    email: user.email,
    region: user.region,
    role: user.role,
    state: user.state,
    avatar: user.avatar,
    validated: user.validated,
    predictions: user.predictionsId,
    notifications: user.notifications,
  };
  return userData;
};

const update = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

const updateNotifications = async (id, data) => {
  const user = await User.findById(id);
  return Notification.findByIdAndUpdate(user.notifications, data, {
    new: true,
  });
};

const deleteOne = (id) => {
  return User.findByIdAndUpdate(id, { state: false });
};

module.exports = {
  getAll,
  getById,
  login,
  signUp,
  getLoggedUser,
  update,
  updateNotifications,
  deleteOne,
};
