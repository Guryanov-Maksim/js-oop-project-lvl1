import _ from 'lodash';

import Schema from './Schema.js';

class NumberSchema extends Schema {
  constructor() {
    super();
    this.checks = [];
    this.requiredValue = false;
    this.type = 'number';
  }

  required() {
    this.requiredValue = true;
    return this;
  }

  positive() {
    const check = (number) => {
      if (!_.isNumber(number)) {
        return false;
      }
      return number >= 0;
    };
    this.addCheck(check);
    return this;
  }

  range(min, max) {
    const check = (number) => {
      if (!_.isNumber(number)) {
        return false;
      }
      return number >= min && number <= max;
    };
    this.addCheck(check);
    return this;
  }
}

export default NumberSchema;
