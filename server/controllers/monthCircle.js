/**
 * Month Circle Controller.
 *
 * @module server/controllers/monthCircle
 */

const MonthCircle = require('../models/MonthCircle');

const createMonthCircle = (req, res, next) => new MonthCircle(req.body)
  .save()
  .then((month) => res.json(month))
  .catch(next);

const getMonthCircle = (req, res, next) => MonthCircle
  .find(req.params.id)
  .then((month) => res.json(month))
  .catch(next);

const getMonthCircles = (req, res, next) => MonthCircle
  .find()
  .then((months) => res.json(months))
  .catch(next);

const deleteMonthCircle = (req, res, next) => MonthCircle
  .findByIdAndRemove(req.params.id)
  .then(() => res.json({
    message: 'Month was deleted',
  }))
  .catch(next);

const updateMonthCircle = (req, res, next) => MonthCircle
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((updatedMonth) => res.json(updatedMonth))
  .catch(next);

module.exports = {
  createMonthCircle,
  deleteMonthCircle,
  getMonthCircle,
  getMonthCircles,
  updateMonthCircle,
};
