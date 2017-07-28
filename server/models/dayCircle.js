const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

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
}, {
  collection: 'dayCircles',
});

schema.statics.findDays = function findDays() {
  return this.aggregate([
    {
      $lookup: {
        from: 'days',
        localField: 'dayCircle',
        foreignField: '_id',
        as: 'day',
      },
    },
  ]);
};

const DayCircle = mongoose.model('DayCircle', schema);

module.exports = DayCircle;
