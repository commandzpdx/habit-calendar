/**
 * Habit Controller.
 *
 * @module server/controllers/habit
 */

const Habit = require('../models/Habit');
const User = require('../models/User');

const createHabit = (req, res, next) => new Habit(req.body)
  .save()
  .then((habit) => Promise.all([
    habit,
    // Push the newly saved habit to the user's habit array.
    User.findByIdAndUpdate(req.user._id, {
      $push: {
        habits: habit._id,
      },
    }),
  ]))
  .then(([habit]) => res.json(habit))
  .catch(next);

const deleteHabit = (req, res, next) => Habit
  .findByIdAndRemove(req.params.id)
  .then(() => res.json({
    message: 'the habit was deleted',
  }))
  .catch(next);

const getHabit = (req, res, next) => Habit
  .findById(req.params.id)
  .then((habit) => res.json(habit))
  .catch(next);

const getHabits = (req, res, next) => Habit
  .find()
  .then((habits) => res.json(habits))
  .catch(next);

const updateHabit = (req, res, next) => Habit
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((updatedHabit) => res.json(updatedHabit))
  .catch(next);

module.exports = {
  createHabit,
  getHabit,
  getHabits,
  updateHabit,
  deleteHabit,
};
