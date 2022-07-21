import Schema from './Schema.js';

class NumberSchema extends Schema {
  constructor(customValidators) {
    super();
    this.checks = [];
    this.requiredValue = false;
    this.type = 'array';
    this.customValidators = customValidators;
  }

  required() {
    this.requiredValue = true;
    return this;
  }

  sizeOf(size) {
    const check = (value) => {
      if (!Array.isArray(value)) {
        return false;
      }
      return value.length === size;
    };
    this.addCheck(check);
    return this;
  }
}

export default NumberSchema;
