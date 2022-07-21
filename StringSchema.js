import Schema from './Schema.js';

class StringSchema extends Schema {
  constructor() {
    super();
    this.checks = [];
    this.requiredValue = false;
    this.type = 'string';
  }

  required() {
    this.requiredValue = true;
    return this;
  }

  minLength(length) {
    const check = (string) => string?.length >= length;
    this.addCheck(check);
    return this;
  }

  contains(target) {
    const check = (string) => !!string?.includes(target);
    this.addCheck(check);
    return this;
  }
}

export default StringSchema;
