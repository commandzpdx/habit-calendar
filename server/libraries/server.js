const http = require('http');

const app = require('./app');

const server = http.createServer(app);

let port;

server.on('listening', () => {
  port = server.address().port;
  console.log(`server is running at port ${port}`);
});

server.on('close', () => {
  console.log(`server stopped running at port ${port}`);
});

module.exports = server;
