/**
 * Day Circle Model.
 *
 * @module server/models/DayCircle
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const { ObjectId } = mongoose.mongo;
const { Types } = Schema;

const schema = new Schema({
  pathD: {
    type: Types.String,
    trim: true,
    required: true,
  },
  textContent: {
    type: Types.Number,
    required: true,
  },
  textTransform: {
    type: Types.String,
    trim: true,
    required: true,
  },
  month: {
    type: Types.ObjectId,
    ref: 'MonthCircle',
  },
}, {
  collection: 'dayCircles',
});

schema.statics.findWithDay = function findWithDay(habitId) {
  return this.aggregate([
    // Join any existing day from days collection into dayCircle.
    {
      $lookup: {
        from: 'days',
        localField: '_id',
        foreignField: 'dayCircle',
        as: 'days',
      },
    },
    // Re-organize day circle properties.
    {
      $project: {
        month: true,
        dayCircle: {
          _id: '$_id',
          pathD: '$pathD',
          textContent: '$textContent',
          textTransform: '$textTransform',
          day: {
            $let: {
              vars: {
                firstDay: {
                  $arrayElemAt: [
                    // Bring back day with a specified habit ID.
                    {
                      $filter: {
                        input: '$days',
                        as: 'day',
                        cond: {
                          $eq: ['$$day.habit', ObjectId(habitId)],
                        },
                      },
                    },
                    // Get the first item from filtered array. Only one should exist.
                    0,
                  ],
                },
              },
              in: {
                $cond: {
                  if: '$$firstDay',
                  then: {
                    _id: '$$firstDay._id',
                    isFilled: '$$firstDay.isFilled',
                    year: '$firstDay.year',
                    weekday: '$$firstDay.weekday',
                  },
                  else: {
                    _id: '',
                    isFilled: '',
                    year: '',
                    weekday: '',
                  },
                },
              },
            },
          },
        },
      },
    },
    // Group days by month.
    {
      $group: {
        _id: '$month',
        dayCircles: {
          $push: '$dayCircle',
        },
      },
    },
    // Populate month.
    {
      $lookup: {
        from: 'monthCircles',
        localField: '_id',
        foreignField: '_id',
        as: 'month',
      },
    },
    // Re-organize month properties.
    {
      $project: {
        month: {
          $arrayElemAt: ['$month.month', 0],
        },
        monthPathClassName: {
          $arrayElemAt: ['$month.monthPathClassName', 0],
        },
        monthTextClassName: {
          $arrayElemAt: ['$month.monthTextClassName', 0],
        },
        dayPathClassName: {
          $arrayElemAt: ['$month.dayPathClassName', 0],
        },
        dayTextClassName: {
          $arrayElemAt: ['$month.dayTextClassName', 0],
        },
        monthCircle: {
          $arrayElemAt: ['$month.monthCircle', 0],
        },
        dayCircles: true,
      },
    },
  ]);
};

const DayCircle = mongoose.model('DayCircle', schema);

module.exports = DayCircle;
