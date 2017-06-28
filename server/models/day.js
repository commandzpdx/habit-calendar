const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  circleFilled: {
    type: Boolean,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  weekday: {
    type: String,
  },
  dayCircle: {
    type: Schema.Types.ObjectId,
    ref: 'DayCircle',
  },
  habit: {
    type: Schema.Types.ObjectId,
    ref: 'Habit',
  },
});

const Day = mongoose.model('Day', schema);
module.exports = Day;
