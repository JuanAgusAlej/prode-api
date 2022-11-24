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
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  region: {
    type: String,
    enum: ['AR', 'BR', ' US'],
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ['ES', 'PT', 'EN'],
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

// Instance methods
userSchema.methods.getPoints = async function () {
  const points = await model('Prediction').aggregate([
    {
      $match: {
        userId: this._id,
      },
    },
    {
      $group: {
        _id: '$userId',
        points: { $sum: '$points' },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  return points[0]?.points || 0;
};

const User = model('User', userSchema);

module.exports = User;
