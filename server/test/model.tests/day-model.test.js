const assert = require('chai').assert;

const Day = require('../../models/day');

let testDay = {
  circleFilled: true,
  year: 2001,
  weekday: 'Monday',
  dayCircle: {},
  habit: {},
};

describe.only('day model', () => {
  it('is valid with circleFilled and year', () => {
    return new Day({
      circleFilled: true,
      year: 1999,
    }).validate();
  });

});
