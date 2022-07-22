import _ from 'lodash';
import Schema from './Schema.js';

class ArraySchema extends Schema {
  constructor(validators) {
    super(validators);
    this.typeCompatibilityCheck = (value) => {
      if (Array.isArray(value)) {
        return true;
      }
      if (_.isNull(value)) {
        return true;
      }
      return false;
    };
  }

  required() {
    return this.test('required');
  }

  sizeof(size) {
    return this.test('sizeof', size);
  }
}

export const defaultValidators = {
  required: (value) => Array.isArray(value),
  sizeof: (value, size) => {
    if (!Array.isArray(value)) {
      return false;
    }
    return value.length === size;
  },
};

export default ArraySchema;
