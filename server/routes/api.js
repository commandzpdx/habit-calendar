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
const { ensureAuth } = require('../middlewares/auth');

// Express router for API routes.
const router = Router();

// Circles.
router.route('/circles')
  .get(circleController.getCircles);

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
  .post(bodyParser.json(), dayController.saveFillDay)
  .put(bodyParser.json(), dayController.updateFillDay);

// Habits.
router.route('/habits')
  .get(ensureAuth(), habitController.getAllHabits)
  .post(ensureAuth(), bodyParser.json(), habitController.postHabit);

router.route('/habits/:id')
  // TODO: these PUT and DELETE methods need limitations
  // currently any logged in user can delete or edit all habits
  .delete(ensureAuth(), habitController.deleteHabit)
  .get(ensureAuth(), habitController.getHabit)
  .put(ensureAuth(), bodyParser.json(), habitController.updateHabit);

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
  .get(ensureAuth(), authController.token);

// User signup.
router.route('/users')
  .post(bodyParser.json(), userController.signup);

// Errors.
router.use(errorController.notFound);
router.use(errorController.errorByName);
router.use(errorController.errorByCode);
router.use(errorController.internalServer);

module.exports = router;
