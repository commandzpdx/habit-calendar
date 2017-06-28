const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  month: {
    type: String,
    required: true,
  },
  monthPathClassName: {
    type: String,
    required: true,
  },
  monthTextClassName: {
    type: String,
    required: true,
  },
  dayPathClassName: {
    type: String,
    required: true,
  },
  dayTextClassName: {
    type: String,
    required: true,
  },
  monthCircle: {
    pathD: {
      type: String,
      required: true,
    },
    textContent: {
      type: String,
      required: true,
    },
    textTransform: {
      type: String,
      required: true,
    },
  },
  // dayCircles: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'DayCircle',
  // }],
});

const MonthCircle = mongoose.model('MonthCircle', schema);
module.exports = MonthCircle;