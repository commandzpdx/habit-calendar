const Habit = require('../models/habit');
const User = require('../models/user');

const habitController = {

  postHabit(req, res, next) {
    const data = req.body;

    return new Habit(data).save()
    .then((habit) => {
      return Promise.all([
        habit,
        User.findByIdAndUpdate(req.user._id, { $push: { habits: habit._id } }),
      ]);
    })
    .then(userData => res.json(userData[0]))
    .catch(next);
  },

};

module.exports = habitController;
