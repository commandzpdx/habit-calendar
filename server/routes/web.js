const { Router } = require('express');
const path = require('path');

const webRouter = Router();

// Render react app
webRouter.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = webRouter;
