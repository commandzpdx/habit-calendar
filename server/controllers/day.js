/**
 * Day Controller.
 *
 * @module server/controllers/day
 */

const Day = require('../models/Day');

const createDay = (req, res, next) => new Day(req.body)
  .save()
  .then((day) => res.json({
    _id: day._id,
    isFilled: day.isFilled,
    year: day.year,
    weekday: day.weekday,
  }))
  .catch(next);

const updateDay = (req, res, next) => Day
  .findByIdAndUpdate(req.params.id, { isFilled: req.body.isFilled }, { new: true })
  .then((day) => res.json({
    _id: day._id,
    isFilled: day.isFilled,
    year: day.year,
    weekday: day.weekday,
  }))
  .catch(next);

module.exports = {
  createDay,
  updateDay,
};
