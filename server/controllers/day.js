const Day = require('../models/day');

const dayController = {
  saveFillDay(req, res, next) {
    const data = req.body;
    console.log(data);
    return new Day(data).save()
      .then((day) => {
        return res.json(day);
      })
      .catch(next);
  },

  updateFillDay(req, res, next) {
    return Day.findByIdAndUpdate(req.body.id, { circleFilled: req.body.filled }, { new: true })
      .then((circle) => {
        return res.json(circle);
      })
      .catch(next);
  },
};

module.exports = dayController;
