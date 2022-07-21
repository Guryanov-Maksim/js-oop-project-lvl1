import StringSchema from './StringSchema.js';
import NumberSchema from './NumberSchema.js';

export default class Validator {
  string() {
    return new StringSchema();
  }

  number() {
    return new NumberSchema();
  }
}
