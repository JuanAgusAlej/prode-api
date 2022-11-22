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

const disableUser = async (req, res, next) => {
  try {
    await userService.deleteOne(req.params.id);
    res.sendStatus(204);
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

const signUp = async (req, res, next) => {
  try {
    const user = await userService.signUp({
      name: req.body.name,
      alias: req.body.alias,
      uid: req.body.uid,
      email: req.body.email,
      avatar: req.body.avatar,
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
    const userId = req.user.id;
    const { validated } = req.user;
    const { name, region, avatar } = req.body;
    const data = {
      name,
      region,
      avatar,
    };
    if (!validated) data.validated = !validated;

    const modifiedUser = await userService.update(userId, data);
    res.send(modifiedUser);
  } catch (e) {
    next(e);
  }
};

const editUserNotification = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { email, push } = req.body;
    const notificationsModified = await userService.updateNotifications(
      userId,
      {
        email,
        push,
      }
    );
    res.send(notificationsModified);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  login,
  signUp,
  detailsUser,
  editUser,
  editUserNotification,
  disableUser,
};
