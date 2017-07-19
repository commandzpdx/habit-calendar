const { Router } = require('express');
const bodyParser = require('body-parser');

const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const monthCircleController = require('../controllers/monthCircle');
const dayCircleController = require('../controllers/dayCircle');
const circleController = require('../controllers/circle');
const habitController = require('../controllers/habit');
const errorController = require('../controllers/error');
const { ensureAuth } = require('../middlewares/auth');

// Express router for API
const apiRouter = Router();

// User signin
apiRouter.post('/user/signin', bodyParser.json(), authController.signin);

// User token verification
apiRouter.get('/user/token', ensureAuth(), authController.token);

// User signup
apiRouter.post('/users', bodyParser.json(), userController.signup);

// MonthCircle CRUD
apiRouter.post('/month-circles', bodyParser.json(), monthCircleController.createMonth);

apiRouter.get('/month-circles', monthCircleController.getMonths);

apiRouter.get('/month-circles/:id', monthCircleController.getMonth);

apiRouter.delete('/month-circles/:id', monthCircleController.deleteMonth);

apiRouter.put('/month-circles/:id', bodyParser.json(), monthCircleController.updateMonth);

// DayCircle CRUD

apiRouter.post('/day-circles', bodyParser.json(), dayCircleController.createDays);

apiRouter.post('/day-circles/day', bodyParser.json(), dayCircleController.createDay);

apiRouter.get('/day-circles', dayCircleController.getDays);

apiRouter.get('/day-circles/:id', dayCircleController.getDay);

apiRouter.delete('/day-circles/:id', dayCircleController.deleteDay);

apiRouter.put('/day-circles/:id', bodyParser.json(), dayCircleController.updateDay);

// Habit CRUD

apiRouter.post('/habits', ensureAuth(), bodyParser.json(), habitController.postHabit);

apiRouter.get('/habits/:id', ensureAuth(), habitController.getHabit);

apiRouter.get('/habits', ensureAuth(), habitController.getAllHabits);

apiRouter.put('/habits/:id', ensureAuth(), bodyParser.json(), habitController.updateHabit);

apiRouter.delete('/habits/:id', ensureAuth(), habitController.deleteHabit);

// Circles

apiRouter.get('/circles', circleController.getCircles);

// Errors
apiRouter.use(errorController.notFound);
apiRouter.use(errorController.errorByName);
apiRouter.use(errorController.errorByCode);
apiRouter.use(errorController.internalServer);

module.exports = apiRouter;
