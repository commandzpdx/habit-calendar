/**
 * API Routes.
 *
 * @module server/routes/api
 */

const { Router } = require('express');
const bodyParser = require('body-parser');

const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const monthCircleController = require('../controllers/monthCircle');
const dayCircleController = require('../controllers/dayCircle');
const circleController = require('../controllers/circle');
const dayController = require('../controllers/day');
const habitController = require('../controllers/habit');
const errorController = require('../controllers/error');
const authMiddlewares = require('../middlewares/auth');

// Express router for API routes.
const router = Router();

// Circles.
router.route('/circles')
  .get(authMiddlewares.ensureAuth(), circleController.getCircles);

// Day circles.
router.route('/day-circles')
  .get(dayCircleController.getDays)
  .post(bodyParser.json(), dayCircleController.createDays);

router.route('/day-circles/day')
  .post(bodyParser.json(), dayCircleController.createDay);

router.route('/day-circles/:id')
  .delete(dayCircleController.deleteDay)
  .get(dayCircleController.getDay)
  .put(bodyParser.json(), dayCircleController.updateDay);

// Days.
router.route('/days')
  .post(authMiddlewares.ensureAuth(), bodyParser.json(), dayController.createFillDay)
  .put(authMiddlewares.ensureAuth(), bodyParser.json(), dayController.updateFillDay);

// Habits.
router.route('/habits')
  .get(authMiddlewares.ensureAuth(), habitController.getHabits)
  .post(authMiddlewares.ensureAuth(), bodyParser.json(), habitController.createHabit);

router.route('/habits/:id')
  // TODO: these PUT and DELETE methods need limitations
  // currently any logged in user can delete or edit all habits
  .delete(authMiddlewares.ensureAuth(), habitController.deleteHabit)
  .get(authMiddlewares.ensureAuth(), habitController.getHabit)
  .put(authMiddlewares.ensureAuth(), bodyParser.json(), habitController.updateHabit);

// Month circles.
router.route('/month-circles')
  .get(monthCircleController.getMonths)
  .post(bodyParser.json(), monthCircleController.createMonth);

router.route('/month-circles/:id')
  .delete(monthCircleController.deleteMonth)
  .get(monthCircleController.getMonth)
  .put(bodyParser.json(), monthCircleController.updateMonth);

// User signin.
router.route('/user/signin')
  .post(bodyParser.json(), authController.signin);

// User token verification.
router.route('/user/token')
  .get(authMiddlewares.ensureAuth(), authController.token);

// User signup.
router.route('/users')
  .post(bodyParser.json(), userController.signup);

// Errors.
router.use(errorController.notFound);
router.use(errorController.errorByName);
router.use(errorController.errorByCode);
router.use(errorController.internalServer);

module.exports = router;
