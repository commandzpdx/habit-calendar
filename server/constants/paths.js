/**
 * Path Constants.
 *
 * @module server/constants/paths
 */

const path = require('path');

// Define file paths.
const SERVER = path.resolve(__dirname, '..');
const PUBLIC = `${SERVER}/public`;
const INDEX = `${SERVER}/public/index.html`;

module.exports = {
  INDEX,
  PUBLIC,
  SERVER,
};
