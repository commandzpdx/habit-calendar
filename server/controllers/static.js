const { indexHtml } = require('../config/paths');

const staticController = {
  index(req, res) {
    return res.sendFile(indexHtml);
  },
};

module.exports = staticController;
