/**
 * Path Constants.
 *
 * @module server/constants/paths
 */

const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SERVER_INDEX = `${ROOT}/server/public/index.html`;
const SERVER_PUBLIC = `${ROOT}/server/public`;

module.exports = {
  ROOT,
  SERVER_INDEX,
  SERVER_PUBLIC,
};
