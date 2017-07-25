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
};

module.exports = dayController;
