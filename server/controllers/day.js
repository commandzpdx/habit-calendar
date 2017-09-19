/**
 * Day Controller.
 *
 * @module server/controllers/day
 */

const Day = require('../models/day');

const saveFillDay = (req, res, next) => {
  const data = req.body;

  return new Day(data).save()
    .then(day => res.json(day))
    .catch(next);
};

const updateFillDay = (req, res, next) => Day
  .findByIdAndUpdate(req.body.id, { circleFilled: req.body.filled }, { new: true })
  .then(circle => res.json(circle))
  .catch(next);

module.exports = {
  saveFillDay,
  updateFillDay,
};
