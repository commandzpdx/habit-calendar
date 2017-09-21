/**
 * Month Circle Controller.
 *
 * @module server/controllers/monthCircle
 */

const MonthCircle = require('../models/MonthCircle');

const createMonth = (req, res, next) => new MonthCircle(req.body)
  .save()
  .then((month) => res.json(month))
  .catch(next);

const getMonth = (req, res, next) => MonthCircle
  .find(req.params.id)
  .then((month) => res.json(month))
  .catch(next);

const getMonths = (req, res, next) => MonthCircle
  .find()
  .then((months) => res.json(months))
  .catch(next);

const deleteMonth = (req, res, next) => MonthCircle
  .findByIdAndRemove(req.params.id)
  .then(() => res.json({
    message: 'Month was deleted',
  }))
  .catch(next);

const updateMonth = (req, res, next) => MonthCircle
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((updatedMonth) => res.json(updatedMonth))
  .catch(next);

module.exports = {
  createMonth,
  deleteMonth,
  getMonth,
  getMonths,
  updateMonth,
};
