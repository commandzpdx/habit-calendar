const DayCircle = require('../models/dayCircle');

const circleController = {
  getCircles(req, res, next) {
    return DayCircle
      .findDays()
      .then(circles => res.json(circles))
      .catch(next);
  },
};

module.exports = circleController;
