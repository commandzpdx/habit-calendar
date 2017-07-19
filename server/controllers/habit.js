const Habit = require('../models/habit');
const User = require('../models/user');

const habitController = {

  postHabit(req, res, next) {
    const data = req.body;

    return new Habit(data).save()
    .then((habit) => {
      // Push the newly saved habit to the user's habit array
      return Promise.all([
        habit,
        User.findByIdAndUpdate(req.user._id, { $push: { habits: habit._id } }),
      ]);
    })
    .then(userData => res.json(userData[0]))
    .catch(next);
  },

  getHabit(req, res, next) {
    return Habit.findById(req.params.id)
    .then(habit => res.json(habit))
    .catch(next);
  },

  getAllHabits(req, res, next) {
    return Habit.find()
    .then(habits => res.json(habits))
    .catch(next);
  },

};

module.exports = habitController;
