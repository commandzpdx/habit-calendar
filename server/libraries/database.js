const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config/constants');

mongoose.Promise = global.Promise;

// Log message when connected to MongoDB.
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Log message when disconnected from MongoDB.
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Log message when there's a connection error.
mongoose.connection.on('error', (err) => {
  console.log(`Database conneciton error: ${err}`);
});

// Connect to MongoDB.
const connect = (uri = MONGODB_URI) => mongoose.connect(uri);

// Disconnect from MongoDB.
const disconnect = () => mongoose.connection.close();

module.exports = {
  connect,
  disconnect,
};
