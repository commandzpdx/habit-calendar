/**
 * Web Routes.
 *
 * @module server/routes/web
 */

const { Router } = require('express');

const staticController = require('../controllers/static');

const webRouter = Router();

webRouter.get('*', staticController.index);

module.exports = webRouter;
