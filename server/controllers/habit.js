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
    .then(([habit]) => res.json(habit))
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

  updateHabit(req, res, next) {
    return Habit.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedHabit => res.json(updatedHabit))
    .catch(next);
  },

  deleteHabit(req, res, next) {
    return Habit.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: 'the habit was deleted' }))
    .catch(next);
  },

};

module.exports = habitController;
