class Schema {
  constructor(validators) {
    this.validators = validators;
    this.checks = [];
    this.requiredValue = false;
  }

  isValid(value) {
    if (!this.requiredValue) {
      const isValidValueType = this.typeCompatibilityCheck(value);
      if (!isValidValueType) {
        return false;
      }
    }
    return this.checks.every(({ validate, args }) => validate(value, ...args));
  }

  test(validatorName, ...args) {
    const validate = this.validators[validatorName];

    if (validatorName === 'required') {
      this.requiredValue = true;
    }

    this.checks.push({ validate, args });
    return this;
  }
}

export default Schema;
