const assert = require('chai').assert;

const MonthCircle = require('../../models/monthCircle');

describe.only('monthCircle model', () => {
  it('example with all required fields', () => {
    return new MonthCircle({
      month: 'January',
      monthPathClassName: 'a',
      monthTextClassName: 's',
      dayPathClassName: 'd',
      dayTextClassName: 'f',
      monthCircle: {
        pathD: 'q',
        textContent: 'w',
        textTransform: 'e',
      },
    }).validate();
  });

  it('requires month (invalid without month)', () => {
    return new MonthCircle({
      monthPathClassName: 'a',
      monthTextClassName: 's',
      dayPathClassName: 'd',
      dayTextClassName: 'f',
      monthCircle: {
        pathD: 'q',
        textContent: 'w',
        textTransform: 'e',
      },
    }).validate()
    .then(
      () => { throw new Error('validation should not pass'); },
      err => assert.isNotNull(err),
    );
  });

});