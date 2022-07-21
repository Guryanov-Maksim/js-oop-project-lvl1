import _ from 'lodash';

import Schema from './Schema.js';

class ObjectSchema extends Schema {
  constructor(customValidators) {
    super();
    this.checks = [];
    this.requiredValue = false;
    this.type = 'object';
    this.customValidators = customValidators;
  }

  shape(objectShape) {
    const check = (obj) => {
      const keysCount = Object.keys(obj).length;
      const objectShapeKeysCount = Object.keys(objectShape).length;
      if (keysCount !== objectShapeKeysCount) {
        return false;
      }
      const result = Object.entries(obj)
        .map(([key, value]) => {
          if (_.has(objectShape, key)) {
            const validator = objectShape[key];
            return validator.isValid(value);
          }
          return false;
        })
        .filter((success) => success)
        .length;

      return result === Object.entries(obj).length;
    };
    this.addCheck(check);
    return this;
  }
}

export default ObjectSchema;
