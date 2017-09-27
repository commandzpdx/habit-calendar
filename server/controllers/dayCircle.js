/**
 * Day Circle Controller.
 *
 * @module server/controllers/dayCircle
 */

const DayCircle = require('../models/DayCircle');

const createDayCircle = (req, res, next) => new DayCircle(req.body)
  .save()
  .then((day) => res.json(day))
  .catch(next);

const createDayCircles = (req, res, next) => DayCircle.insertMany(req.body)
  .then((days) => res.json(days))
  .catch(next);

const deleteDayCircle = (req, res, next) => DayCircle
  .findByIdAndRemove(req.params.id)
  .then(() => res.json({ message: 'Day was deleted' }))
  .catch(next);

const getDayCircle = (req, res, next) => DayCircle
  .findById(req.params.id)
  .then((day) => res.json(day))
  .catch(next);

const getDayCircles = (req, res, next) => DayCircle
  .find()
  .then((days) => res.json(days))
  .catch(next);

const updateDayCircle = (req, res, next) => DayCircle
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((updatedDay) => res.json(updatedDay))
  .catch(next);

module.exports = {
  createDayCircle,
  createDayCircles,
  deleteDayCircle,
  getDayCircle,
  getDayCircles,
  updateDayCircle,
};
