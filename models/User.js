const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
    unique: true,
  },
  uidGoogle: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  region: {
    type: String,
    enum: ['Argentina', 'Brasil', 'Estados Unidos'],
    required: true,
  },
  role: {
    type: String,
    default: 'USER_ROLE',
  },
  state: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  predictionsId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Prediction',
      required: false,
      default: null,
    },
  ],
  validated: {
    type: Boolean,
    default: false,
  },
  notifications: {
    type: Schema.Types.ObjectId,
    ref: 'Notification',
  },
});

const User = model('User', userSchema);

module.exports = User;
