/**
 * Path Constants.
 *
 * @module server/constants/paths
 */

const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = `${ROOT}/public`;
const INDEX = `${ROOT}/public/index.html`;

module.exports = {
  INDEX,
  PUBLIC,
  ROOT,
};
