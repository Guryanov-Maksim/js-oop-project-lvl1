import _ from 'lodash';

import Schema from './Schema.js';

class NumberSchema extends Schema {
  constructor(validators) {
    super(validators);
    this.typeCompatibilityCheck = (value) => {
      if (_.isNull(value) || _.isNumber(value)) {
        return true;
      }
      return false;
    };
  }

  required() {
    return this.test('required');
  }

  positive() {
    return this.test('positive');
  }

  range(min, max) {
    return this.test('range', min, max);
  }
}

export const defaultValidators = {
  required: (value) => _.isNumber(value),
  positive: (number) => {
    if (_.isNull(number)) {
      return true;
    }
    if (!_.isNumber(number)) {
      return false;
    }
    return number > 0;
  },
  range: (number, min, max) => {
    if (!_.isNumber(number)) {
      return false;
    }
    return number >= min && number <= max;
  },
};

export default NumberSchema;
