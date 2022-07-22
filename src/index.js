import StringSchema, { defaultValidators as string } from './StringSchema.js';
import NumberSchema, { defaultValidators as number } from './NumberSchema.js';
import ArraySchema, { defaultValidators as array } from './ArraySchema.js';
import ObjectSchema, { defaultValidators as object } from './ObjectSchema.js';

export default class Validator {
  constructor() {
    this.validatorsByType = {
      string,
      number,
      array,
      object,
    };
  }

  string() {
    return new StringSchema(this.validatorsByType.string);
  }

  number() {
    return new NumberSchema(this.validatorsByType.number);
  }

  array() {
    return new ArraySchema(this.validatorsByType.array);
  }

  object() {
    return new ObjectSchema(this.validatorsByType.object);
  }

  addValidator(type, validatorName, validator) {
    this.validatorsByType[type] = {
      ...this.validatorsByType[type],
      [validatorName]: validator,
    };
  }
}
