const { Router } = require('express');

const authController = require('../controllers/auth');
const ensureAuth = require('../middlewares/ensure-auth');

// Express router for API
const apiRouter = Router();

// User login validation
apiRouter.post('/user/login', authController.login);

// User token verification
apiRouter.get('/user/token', ensureAuth(), authController.token);

module.exports = apiRouter;
