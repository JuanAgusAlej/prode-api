/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
const { User, Setting, Role } = require('../models');
const { newLog } = require('../utils/logs');
const { generateToken } = require('../utils/tokens');
const { sendActivationEmail } = require('../utils/emails');

const getAll = () => {
  return User.find().populate('role');
};

const getById = id => {
  return User.findById(id);
};

const login = async uid => {
  const user = await User.findOne({ uid })
    .populate('settings', 'email push language -_id')
    .populate('predictionsId')
    .populate('role');
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
    timezone: user.timezone,
    language: user.settings.language,
    role: user.role.rol,
    state: user.state,
    avatar: user.avatar,
    validated: user.validated,
    predictions: user.predictionsId,
    notifications: {
      email: user.settings.email,
      push: user.settings.push,
    },
  };

  const tokenPayload = {
    id: user.id,
    uid: user.uid,
    email: user.email,
    region: user.region,
    role: user.role.rol,
    validated: user.validated,
    language: user.settings.language,
  };
  const token = generateToken(tokenPayload);

  // New log -> LOG_IN
  await newLog(user.id, 'LOG_IN');

  return {
    user: userData,
    token,
  };
};

const logout = async userId => {
  // New log -> LOG_OUT
  await newLog(userId, 'LOG_OUT');
};

const signUp = async data => {
  let language;
  const alias = data.alias ? data.alias : data.name;
  if (data.region === 'AR') {
    language = 'ES';
  } else if (data.region === 'BR') {
    language = 'PT';
  } else {
    language = 'EN';
  }

  const user = await User.create({ ...data, alias });
  const userr = await User.findOne({ uid: user.uid }).populate('role');
  const tokenPayload = {
    id: user.id,
    uid: user.uid,
    email: user.email,
    role: userr.role.rol,
    validated: user.validated,
    region: user.region,
    language,
  };
  const token = generateToken(tokenPayload);
  const setting = await Setting.create({ userId: user.id, language });
  user.settings = setting.id;
  await user.save();

  // New log -> SIGN_UP
  await newLog(user.id, 'SIGN_UP');

  await sendActivationEmail({ id: user.id, email: user.email });

  return {
    user,
    token,
  };
};

const getLoggedUser = async id => {
  const user = await User.findById(id)
    .populate('settings', 'email push language -_id')
    .populate('predictionsId')
    .populate('role');
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
    timezone: user.timezone,
    language: user.settings.language,
    role: user.role.rol,
    state: user.state,
    avatar: user.avatar,
    validated: user.validated,
    predictions: user.predictionsId,
    notifications: {
      email: user.settings.email,
      push: user.settings.push,
    },
  };
  return userData;
};

const update = async (user, data) => {
  const { id, validated } = user;
  // New log -> EDIT_PROFILE
  await newLog(id, 'EDIT_PROFILE', data);

  if (validated !== data.validated) {
    // New log -> VALIDATE_EMAIL
    await newLog(id, 'VALIDATE_EMAIL');
  }

  return User.findByIdAndUpdate(id, data, { new: true });
};

const updateSettings = async (id, data) => {
  const user = await User.findById(id);

  // New log -> EDIT_SETTINGS
  await newLog(id, 'EDIT_SETTINGS', data);

  return Setting.findByIdAndUpdate(user.settings, data, {
    new: true,
  });
};

const updatePushToken = async (id, token) => {
  await User.findOneAndUpdate(
    {
      _id: { $ne: id },
      pushTokens: { $all: [token] },
    },
    {
      $pullAll: {
        pushTokens: [token],
      },
    }
  );

  await User.updateOne(
    { _id: id },
    {
      $addToSet: {
        pushTokens: token,
      },
    }
  );
};

const changeStatus = async id => {
  const user = await User.findById(id);
  user.state = !user.state;
  user.save();
  return user;
};

const changeRole = async id => {
  const user = await User.findById(id).populate('role');
  const userRole = await Role.findOne({ rol: 'USER_ROLE' });
  const adminRole = await Role.findOne({ rol: 'ADMIN_ROLE' });
  user.role = user.role.rol === 'USER_ROLE' ? adminRole._id : userRole._id;
  await user.save();
  return user;
};

module.exports = {
  getAll,
  getById,
  login,
  logout,
  signUp,
  getLoggedUser,
  update,
  updateSettings,
  updatePushToken,
  changeStatus,
  changeRole,
};
