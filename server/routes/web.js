const { Router } = require('express');
const staticController = require('../controllers/static');

const webRouter = Router();

// Render react app.
webRouter.get('*', staticController.index);

module.exports = webRouter;
