/**
 * Day Circle Controller.
 *
 * @module server/controllers/dayCircle
 */

const DayCircle = require('../models/DayCircle');

const createDays = (req, res, next) => DayCircle
  .insertMany(req.body)
  .then(days => res.json(days))
  .catch(next);

const createDay = (req, res, next) => new DayCircle(req.body)
  .save()
  .then(day => res.json(day))
  .catch(next);

const getDays = (req, res, next) => DayCircle
  .find()
  .then(days => res.json(days))
  .catch(next);

const getDay = (req, res, next) => DayCircle
  .findById(req.params.id)
  .then(day => res.json(day))
  .catch(next);

const deleteDay = (req, res, next) => DayCircle
  .findByIdAndRemove(req.params.id)
  .then(() => res.json({ message: 'Day was deleted' }))
  .catch(next);

const updateDay = (req, res, next) => DayCircle
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(updatedDay => res.json(updatedDay))
  .catch(next);

module.exports = {
  createDay,
  createDays,
  deleteDay,
  getDay,
  getDays,
  updateDay,
};
