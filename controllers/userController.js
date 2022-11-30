const userService = require('../services/userService');

// Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    res.send(user);
  } catch (e) {
    next(e);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const userModified = await userService.changeStatus(req.params.id);
    res.send(userModified);
  } catch (e) {
    next(e);
  }
};

const changeRole = async (req, res, next) => {
  try {
    const userModified = await userService.changeRole(req.params.id);
    res.send(userModified);
  } catch (e) {
    next(e);
  }
};

// User
const login = async (req, res, next) => {
  try {
    const { uid } = req.body;
    const user = await userService.login(uid);
    if (user) {
      res.send(user);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const signUp = async (req, res, next) => {
  try {
    const user = await userService.signUp({
      name: req.body.name,
      alias: req.body.alias,
      uid: req.body.uid,
      email: req.body.email,
      avatar: req.body.avatar,
      region: req.body.region,
      timezone: req.body.timezone,
    });
    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
};

const detailsUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userService.getLoggedUser(userId);
    res.send(user);
  } catch (e) {
    next(e);
  }
};

const editUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { validated } = req.user;
    const { alias, avatar } = req.body;
    const data = {
      alias,
      avatar,
    };
    if (!validated) data.validated = !validated;

    const modifiedUser = await userService.update(user, data);
    res.send(modifiedUser);
  } catch (e) {
    next(e);
  }
};

const setPushToken = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await userService.updatePushToken(userId, req.body.token);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const editUserSettings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { email, push, language } = req.body;
    const settingsModified = await userService.updateSettings(userId, {
      email,
      push,
      language,
    });
    res.send(settingsModified);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  login,
  logout,
  signUp,
  detailsUser,
  editUser,
  editUserSettings,
  setPushToken,
  changeStatus,
  changeRole,
};
