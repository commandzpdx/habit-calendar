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

module.exports = mongoose;
