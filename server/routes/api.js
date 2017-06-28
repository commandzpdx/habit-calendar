const { Router } = require('express');
const { json: bodyParser } = require('body-parser');

const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const monthCircleController = require('../controllers/monthCircle');
const ensureAuth = require('../middlewares/ensure-auth');
const handleErrors = require('../middlewares/handle-errors');
const handleNotFound = require('../middlewares/handle-not-found');

// Express router for API
const apiRouter = Router();

// User signin
apiRouter.post('/user/signin', bodyParser(), authController.signin);

// User token verification
apiRouter.get('/user/token', ensureAuth(), authController.token);

// User signup
apiRouter.post('/users', bodyParser(), userController.signup);

// MonthCircle CRUD
apiRouter.post('/month-circles', bodyParser(), monthCircleController.createMonth);

apiRouter.get('/month-circles', monthCircleController.getMonths);

apiRouter.get('/month-circles/:id', monthCircleController.getMonth);

apiRouter.delete('/month-circles/:id', monthCircleController.deleteMonth);

apiRouter.put('/month-circles/:id', bodyParser(), monthCircleController.updateMonth);

// Handle not found (404) response
apiRouter.use(handleNotFound());

// Handle error response
apiRouter.use(handleErrors());

module.exports = apiRouter;
