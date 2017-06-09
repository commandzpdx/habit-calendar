const { Router } = require('express');
const { json: bodyParser } = require('body-parser');

const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const ensureAuth = require('../middlewares/ensure-auth');

// Express router for API
const apiRouter = Router();

// User login validation
apiRouter.post('/user/login', bodyParser(), authController.login);

// User token verification
apiRouter.get('/user/token', ensureAuth(), authController.token);

// User signup
apiRouter.post('/users', bodyParser(), userController.signup);

module.exports = apiRouter;
