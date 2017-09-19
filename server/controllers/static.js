const PATHS = require('../constants/paths');

const staticController = {
  index(req, res) {
    return res.sendFile(PATHS.SERVER_INDEX);
  },
};

module.exports = staticController;
