const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tokenGoogle: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  region: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
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
      default: null
    },
  ],
})

const User = model('User', userSchema);

module.exports = User;
