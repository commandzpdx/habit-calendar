const MonthCircle = require('../models/monthCircle');

const monthCircleController = {
  createMonth(req, res, next) {
    const data = req.body;

    return new MonthCircle(data).save()
      .then((month) => {
        return res.json(month);
      })
      .catch(next);
  },

  getMonths(req, res, next) {

    return MonthCircle.find()
    .then((months) => {
      return res.json(months);
    })
    .catch(next);
  },

  getMonth(req, res, next) {

    return MonthCircle.find(req.params.id)
    .then((month) => {
      return res.json(month);
    })
    .catch(next);
  },

  deleteMonth(req, res, next) {

    return MonthCircle.findByIdAndRemove(req.params.id)
    .then(() => {
      return res.json({ message: 'Month was deleted' });
    })
    .catch(next);
  },

  updateMonth(req, res, next) {

    return MonthCircle.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMonth) => {
      return res.json(updatedMonth);
    })
    .catch(next);
  },

};

module.exports = monthCircleController;
