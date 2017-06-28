const assert = require('chai').assert;

const Habit = require('../../models/habit');

describe('habit model', () => {
  it('example with all required fields', () => {
    return new Habit({
      category: 'asdf',
      startDate: new Date(),
    }).validate();
  });

  it('requires category (invalid with no category)', () => {
    const habit1 = new Habit({
      startDate: new Date(),
    });
    return habit1.validate()
    .then(
      () => { throw new Error('validation should not succeed'); },
      err => assert.isNotNull(err),
    );
  });

  it('requires startDate (invalid with no startDate)', () => {
    const habit2 = new Habit({
      category: 'asdf',
    });
    return habit2.validate()
    .then(
      () => { throw new Error('validation should not succeed'); },
      err => assert.isNotNull(err),
    );
  });

});
