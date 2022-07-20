import StringSchema from './StringSchema.js';

export default class Validator {
  string() {
    return new StringSchema();
  }
}
