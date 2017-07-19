const http = require('http');

const createPath = filePath => http.resolve(__dirname, '..', filePath);

const paths = {
  indexHtml: createPath('server/public/index.html'),
  publicDir: createPath('server/public'),
};

module.exports = paths;
