const path = require('path');

const createPath = filePath => path.resolve(__dirname, '..', filePath);

const paths = {
  indexHtml: createPath('server/public/index.html'),
  publicDir: createPath('server/public'),
};

module.exports = paths;
