const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  pathD: {
    type: String,
    trim: true,
    required: true,
  },
  textContent: {
    type: Number,
    required: true,
  },
  textTransform: {
    type: String,
    trim: true,
    required: true,
  },
  month: {
    type: Schema.Types.ObjectId,
    ref: 'MonthCircle',
  },
});

const DayCircle = mongoose.model('DayCircle', schema);
module.exports = DayCircle;
