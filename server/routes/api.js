const { Router } = require('express');
const { json: bodyParser } = require('body-parser');

const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const ensureAuth = require('../middlewares/ensure-auth');
const handleErrors = require('../middlewares/handle-errors');
const handleNotFound = require('../middlewares/handle-not-found');

// Express router for API
const apiRouter = Router();

// User login validation
apiRouter.post('/user/login', bodyParser(), authController.login);

// User token verification
apiRouter.get('/user/token', ensureAuth(), authController.token);

// User signup
apiRouter.post('/users', bodyParser(), userController.signup);

// Handle not found (404) response
apiRouter.use(handleNotFound());

// Handle error response
apiRouter.use(handleErrors());

module.exports = apiRouter;
