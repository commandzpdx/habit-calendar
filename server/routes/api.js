/**
 * API Routes.
 *
 * @module server/routes/api
 */

const { Router } = require('express');
const bodyParser = require('body-parser');

const authController = require('../controllers/auth');
const errorController = require('../controllers/error');
const dayController = require('../controllers/day');
const dayCircleController = require('../controllers/dayCircle');
const habitController = require('../controllers/habit');
const monthCircleController = require('../controllers/monthCircle');
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

// Express router for API routes.
const router = Router();

// JSON parser middleware for converting incoming requests to JS object.
const jsonParser = bodyParser.json();

// Auth middleware to protect route from public access.
const ensureAuth = authMiddleware.ensureAuth();

// Day circle resource routes.
router.route('/day-circles')
  .get(dayCircleController.getDayCircles)
  .post(jsonParser, dayCircleController.createDayCircles);

router.route('/day-circles/day')
  .post(jsonParser, dayCircleController.createDayCircle);

router.route('/day-circles/:id')
  .delete(dayCircleController.deleteDayCircle)
  .get(dayCircleController.getDayCircle)
  .put(jsonParser, dayCircleController.updateDayCircle);

// Day resource routes.
router.route('/days')
  .post(ensureAuth, jsonParser, dayController.createDay);

router.route('/days/:id')
  .put(ensureAuth, jsonParser, dayController.updateDay);

// Habit resource routes.
router.route('/habits')
  .get(ensureAuth, habitController.getHabits)
  .post(ensureAuth, jsonParser, habitController.createHabit);

router.route('/habits/:id')
  // TODO: these PUT and DELETE methods need limitations
  // currently any logged in user can delete or edit all habits
  .delete(ensureAuth, habitController.deleteHabit)
  .get(ensureAuth, habitController.getHabit)
  .put(ensureAuth, jsonParser, habitController.updateHabit);

// Month circle resource routes.
router.route('/month-circles')
  .get(monthCircleController.getMonthCircles)
  .post(jsonParser, monthCircleController.createMonthCircle);

router.route('/month-circles/:id')
  .delete(monthCircleController.deleteMonthCircle)
  .get(monthCircleController.getMonthCircle)
  .put(jsonParser, monthCircleController.updateMonthCircle);

// User signin route.
router.route('/user/signin')
  .post(jsonParser, authController.signin);

// User token verification.
router.route('/user/token')
  .get(ensureAuth, authController.token);

// User resource routes.
router.route('/users')
  .post(jsonParser, userController.signup);

// Errors.
router.use(errorController.notFound);
router.use(errorController.name);
router.use(errorController.status);
router.use(errorController.internalServer);

module.exports = router;
