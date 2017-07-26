const http = require('http');

const app = require('./app');
const { PORT } = require('../config/constants');

// Create HTTP server.
const server = http.createServer(app);

// Log message when server starts.
server.on('listening', () => {
  console.log(`server running at port ${PORT}`);
});

// Log message when server stops.
server.on('close', () => {
  console.log(`server stopped at port ${PORT}`);
});

// Start HTTP server.
const start = (port = PORT) => new Promise((resolve, reject) => {
  server.listen(port, err => (err ? reject(err) : resolve()));
});

// Stop HTTP server.
const stop = () => new Promise((resolve, reject) => {
  server.close(err => (err ? reject(err) : resolve()));
});

module.exports = {
  start,
  stop,
};
