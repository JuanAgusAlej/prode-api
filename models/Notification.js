const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
  email: {
    type: Boolean,
    default: true,
  },
  push: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
