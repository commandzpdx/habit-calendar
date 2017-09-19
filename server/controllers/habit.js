/**
 * Habit Controller.
 *
 * @module server/controllers/error
 */

const Habit = require('../models/habit');
const User = require('../models/user');

const postHabit = (req, res, next) => {
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
};

const getHabit = (req, res, next) => Habit
  .findById(req.params.id)
  .then(habit => res.json(habit))
  .catch(next);

const getAllHabits = (req, res, next) => Habit
  .find()
  .then(habits => res.json(habits))
  .catch(next);

const updateHabit = (req, res, next) => Habit
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(updatedHabit => res.json(updatedHabit))
  .catch(next);

const deleteHabit = (req, res, next) => Habit
  .findByIdAndRemove(req.params.id)
  .then(() => res.json({ message: 'the habit was deleted' }))
  .catch(next);

module.exports = {
  postHabit,
  getHabit,
  getAllHabits,
  updateHabit,
  deleteHabit,
};
