const admin = require('firebase-admin');

const serviceAccount = require('../firebase-service.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendFCM = (message, type) => {
  if (type === 'UNIQUE') {
    admin.messaging().send(message);
  } else if (type === 'MANY') {
    admin.messaging().sendMulticast(message);
  } else if (type === 'LIST') {
    admin.messaging().sendAll(message);
  }
};

const generateTemplate = (type, data) => {
  let template;
  if (type === 'CORRECT_PREDICTION') {
    template = {
      title: 'You have earned new points!',
      body: `${data.match} prediction was correct. You earned ${data.points} points`,
    };
  }
  return template;
};

const sendNotification = (type, data) => {
  if (type === 'CORRECT_PREDICTION') {
    const notifications = [];
    Object.keys(data.notifications).forEach((notification) => {
      data.notifications[notification].forEach((token) => {
        notifications.push({
          notification: generateTemplate('CORRECT_PREDICTION', {
            match: data.match,
            points: notification,
          }),
          data: {
            type: 'NEW_POINTS',
            points: notification,
            match: data.match,
          },
          token,
        });
      });
    });
    sendFCM(notifications, 'LIST');
  } else {
    const message = {
      notification: generateTemplate(type, data),
      token: data.token,
    };
    sendFCM(message, 'UNIQUE');
  }
};

module.exports = { sendNotification };
