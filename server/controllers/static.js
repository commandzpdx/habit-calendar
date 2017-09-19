/**
 * Static Controller.
 *
 * @module server/controllers/static
 */

const PATHS = require('../constants/paths');

const index = (req, res) => res.sendFile(PATHS.SERVER_INDEX);

module.exports = {
  index,
};
