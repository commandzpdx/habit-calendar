const path = require('path');

const staticController = {
  index(req, res) {
    return res.sendFile(path.resolve(__dirname, '../public/index.html'));
  },
};

module.exports = staticController;
