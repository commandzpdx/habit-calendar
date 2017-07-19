const { MONGODB_URI } = process.env;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log(`Database conneciton error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

const database = {
  connect(uri = MONGODB_URI) {
    return mongoose.connect(uri);
  },
  disconnect() {
    return mongoose.connection.close();
  },
};

module.exports = database;
