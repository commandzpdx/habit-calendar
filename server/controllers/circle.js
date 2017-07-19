const MonthCircle = require('../models/monthCircle');

const circleController = {
  getCircles(req, res, next) {
    return MonthCircle
      .findMonthCircles()
      .then(circles => res.json(circles))
      .catch(next);
  },
};

module.exports = circleController;
