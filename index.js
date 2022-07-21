import StringSchema from './StringSchema.js';
import NumberSchema from './NumberSchema.js';
import ArraySchema from './ArraySchema.js';
import ObjectSchema from './ObjectSchema.js';

export default class Validator {
  constructor() {
    this.customValidators = {};
  }

  string() {
    return new StringSchema(this.customValidators.string);
  }

  number() {
    return new NumberSchema(this.customValidators.number);
  }

  array() {
    return new ArraySchema(this.customValidators.array);
  }

  object() {
    return new ObjectSchema(this.customValidators.object);
  }

  addValidator(schemaName, validatorName, validator) {
    this.customValidators[schemaName] = { [validatorName]: validator };
  }
}
