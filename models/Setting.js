const { Schema, model } = require('mongoose');

const settingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: Boolean,
    default: true,
  },
  push: {
    type: Boolean,
    default: true,
  },
  language: {
    type: String,
    enum: ['ES', 'PT', 'EN'],
    required: true,
  },
});

const Setting = model('Setting', settingSchema);

module.exports = Setting;
