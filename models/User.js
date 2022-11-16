const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    tokenGoogle: {
      type: Array,
      required: true,
    },
    points: {
      type: Number,
      default: 0
    },
    region: {
      type: Number,
      required: true,
    },
    rol: {
      type: Number,
      required: true,
    },
    state: {
      type: Array,
      default: true
    },
    avatar: {
      type: String,
      required: false
    },
    predictionId: {
        type: Number,
        required: false
    }
  });
  
  const User = model('User', userSchema);
  
  module.exports = User;