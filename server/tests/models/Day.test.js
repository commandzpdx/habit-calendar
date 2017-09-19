/**
 * Day Model Test.
 *
 * @module server/tests/models/Day.test
 */

const { assert } = require('chai');

const Day = require('../../models/Day');

describe('day model', () => {
  it('example with all required fields', () => {
    return new Day({
      circleFilled: true,
      year: 1999,
    }).validate();
  });

  it('requires circleFilled (validation fails when no circleFilled)', () => {
    const day1 = new Day({ year: 2001 });
    return day1.validate()
      .then(
        () => { throw new Error('validation should not pass'); },
        err => assert.isNotNull(err),
      );
  });

  it('requires year (validation fails when no year)', () => {
    const day2 = new Day({ circleFilled: false });
    return day2.validate()
      .then(
        () => { throw new Error('validation should not pass'); },
        err => assert.isNotNull(err),
      );
  });
});
