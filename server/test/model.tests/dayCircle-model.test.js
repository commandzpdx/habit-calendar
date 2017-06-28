const assert = require('chai').assert;

const DayCircle = require('../../models/dayCircle');

describe.only('dayCircle model', () => {
  it('example with all required fields', () => {
    return new DayCircle({
      pathD: 'thePath',
      textContent: 1234,
      textTransform: 'some text',
    }).validate();
  });

  
});
