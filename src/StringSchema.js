import _ from 'lodash';
import Schema from './Schema.js';

class StringSchema extends Schema {
  constructor(validators) {
    super(validators);
    this.typeCompatibilityCheck = (value) => {
      if (_.isString(value)) {
        return true;
      }
      if (_.isNull(value)) {
        return true;
      }
      if (_.isUndefined(value)) {
        return true;
      }
      return false;
    };
  }

  required() {
    return this.test('required');
  }

  minLength(length) {
    return this.test('minLength', length);
  }

  contains(target) {
    return this.test('contains', target);
  }
}

export const defaultValidators = {
  required: (value) => _.isString(value) && value.length > 0,
  minLength: (string, length) => string?.length >= length,
  contains: (string, target) => !!string?.includes(target),
};

export default StringSchema;
