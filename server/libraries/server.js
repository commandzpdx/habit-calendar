/**
 * Server Library.
 *
 * @module server/libraries/server
 */

const http = require('http');

const app = require('./app');
const ENV = require('../constants/env');

// Create HTTP server.
const server = http.createServer(app);

// Cache server address info.
let address;

// Log message when server starts.
server.on('listening', () => {
  address = server.address();

  console.log(`Server running at port ${address.port}`);
});

// Log message when server stops.
server.on('close', () => {
  console.log(`Server stopped at port ${address.port}`);
});

// Start HTTP server.
const start = (port = ENV.PORT, host = ENV.HOST) => new Promise((resolve, reject) => {
  server.listen(port, host, (err) => (
    err
      ? reject(err)
      : resolve()
  ));
});

// Stop HTTP server.
const stop = () => new Promise((resolve, reject) => {
  server.close((err) => (
    err
      ? reject(err)
      : resolve()
  ));
});

module.exports = {
  start,
  stop,
};
