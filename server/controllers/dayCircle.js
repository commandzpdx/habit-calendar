const DayCircle = require('../models/dayCircle');

const dayCircleController = {
  createDays(req, res, next) {
    const data = req.body;

    return DayCircle.insertMany(data)
      .then((days) => {
        return res.json(days);
      })
      .catch(next);
  },

  createDay(req, res, next) {
    const data = req.body;

    return new DayCircle(data).save()
      .then((day) => {
        return res.json(day);
      })
      .catch(next);
  },

  getDays(req, res, next) {
    return DayCircle.find()
    .then((days) => {
      return res.json(days);
    })
    .catch(next);
  },

  getDay(req, res, next) {
    return DayCircle.findById(req.params.id)
    .then((day) => {
      return res.json(day);
    })
    .catch(next);
  },

  deleteDay(req, res, next) {
    return DayCircle.findByIdAndRemove(req.params.id)
    .then(() => {
      return res.json({ message: 'Day was deleted' });
    })
    .catch(next);
  },

  updateDay(req, res, next) {
    return DayCircle.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedDay) => {
      return res.json(updatedDay);
    })
    .catch(next);
  },
};

module.exports = dayCircleController;
