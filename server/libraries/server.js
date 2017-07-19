const { PORT } = process.env;
const http = require('http');
const app = require('./app');

const httpServer = http.createServer(app);

httpServer.on('listening', () => {
  console.log(`server is running at port ${PORT}`);
});

httpServer.on('close', () => {
  console.log(`server stopped running at port ${PORT}`);
});

const server = {
  start(port = PORT) {
    return httpServer.listen(port);
  },
};

module.exports = server;
