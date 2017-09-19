/**
 * Circle Controller.
 *
 * @module server/controllers/circle
 */

const DayCircle = require('../models/dayCircle');

const getCircles = (req, res, next) => DayCircle
  .findDays()
  .then(circles => res.json(circles))
  .catch(next);

module.exports = {
  getCircles,
};
