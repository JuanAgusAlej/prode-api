const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log('MongoDB Connected');
  } catch (error) {
    throw new Error('Error a la hora de conectar BBDD');
  }
};

module.exports = {
  dbConnection,
};
