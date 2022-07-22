import _ from 'lodash';

import Schema from './Schema.js';

class ObjectSchema extends Schema {
  constructor(validators) {
    super(validators);
    this.typeCompatibilityCheck = (value) => !_.isUndefined(value);
  }

  required() {
    return this.test('required');
  }

  shape(objectShape) {
    return this.test('shape', objectShape);
  }
}

export const defaultValidators = {
  shape: (obj, objectShape) => {
    const keysCount = Object.keys(obj).length;
    const objectShapeKeysCount = Object.keys(objectShape).length;
    if (keysCount !== objectShapeKeysCount) {
      return false;
    }
    return Object.entries(obj)
      .every(([key, value]) => {
        if (_.has(objectShape, key)) {
          const validator = objectShape[key];
          return validator.isValid(value);
        }
        return false;
      });
  },
};

export default ObjectSchema;
