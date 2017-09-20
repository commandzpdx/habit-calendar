/**
 * Static Controller.
 *
 * @module server/controllers/static
 */

const PATHS = require('../constants/paths');

const index = (req, res) => res.sendFile(PATHS.INDEX);

module.exports = {
  index,
};
