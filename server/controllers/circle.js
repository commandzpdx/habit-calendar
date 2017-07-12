const DayCircle = require('../models/dayCircle');
const MonthCircle = require('../models/monthCircle');

const circleController = {
  getCircles(req, res, next) {
    let circles = [];
    MonthCircle.find()
      .then((months) => {
        circles = months;
        return Promise.all(months.map((month) => {
          return DayCircle.find({ month: month._id });
        }));
      })
      .then((days) => {
        // return circles.map((month, idx) => {
        //   month.dayCircles = "days[idx]";
        //   return month;
        // });
      })
      // .then((newCircles) => {
      //   res.json(newCircles);
      // })
      .catch(next);
  },
};

module.exports = circleController;
