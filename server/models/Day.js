/**
 * Day Model.
 *
 * @module server/models/Day
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const { Types } = Schema;

const schema = new Schema({
  isFilled: {
    type: Types.Boolean,
    required: true,
  },
  year: {
    type: Types.Number,
    required: true,
  },
  weekday: {
    type: Types.String,
    trim: true,
  },
  dayCircle: {
    type: Types.ObjectId,
    ref: 'DayCircle',
    required: true,
  },
  habit: {
    type: Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
}, {
  collection: 'days',
});

const Day = mongoose.model('Day', schema);

module.exports = Day;
