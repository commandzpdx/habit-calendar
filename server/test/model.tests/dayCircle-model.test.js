const assert = require('chai').assert;

const DayCircle = require('../../models/dayCircle');

describe('dayCircle model', () => {
  it('example with all required fields', () => {
    return new DayCircle({
      pathD: 'abc',
      textContent: 123,
      textTransform: 'asdf',
    }).validate();
  });

  it('requires pathD (invalid when no pathD)', () => {
    const dayCircle1 = new DayCircle({
      textContent: 123,
      textTransform: 'asdf',
    });
    return dayCircle1.validate()
    .then(
      () => { throw new Error('validation should not pass'); },
      err => assert.isNotNull(err),
    );
  });

  it('requires textContent (invalid when no textContent', () => {
    const dayCircle2 = new DayCircle({
      pathD: 'abc',
      textTransform: 'asdf',
    });
    return dayCircle2.validate()
    .then(
      () => { throw new Error('validation should not pass'); },
      err => assert.isNotNull(err),
    );
  });

  it('requires textTransform (invalid when no textTransform', () => {
    const dayCircle3 = new DayCircle({
      pathD: 'abc',
      textContent: 123,
    });
    return dayCircle3.validate()
    .then(
      () => { throw new Error('validation should not pass'); },
      err => assert.isNotNull(err),
    );
  });
});
