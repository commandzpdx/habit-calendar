/**
 * Day Controller.
 *
 * @module server/controllers/day
 */

const Day = require('../models/Day');

const createDay = (req, res, next) => new Day(req.body)
  .save()
  .then((day) => res.json(day))
  .catch(next);

const updateDay = (req, res, next) => Day
  .findByIdAndUpdate(req.body.id, { circleFilled: req.body.filled }, { new: true })
  .then((circle) => res.json(circle))
  .catch(next);

module.exports = {
  createDay,
  updateDay,
};
