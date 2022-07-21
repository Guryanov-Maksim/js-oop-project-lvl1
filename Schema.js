import _ from 'lodash';

const typeMapping = {
  number: (value, required) => {
    if (required) {
      if (_.isNumber(value)) {
        return true;
      }
      return false;
    }
    if (_.isNull(value) || _.isNumber(value)) {
      return true;
    }
    return false;
  },
  string: (value, required) => {
    if (required) {
      if (_.isString(value) && value.length > 0) {
        return true;
      }
      return false;
    }
    if (_.isString(value)) {
      return true;
    }
    if (_.isNull(value)) {
      return true;
    }
    if (_.isUndefined(value)) {
      return true;
    }
    return false;
  },
  array: (value, required) => {
    if (Array.isArray(value)) {
      return true;
    }
    if (required && !Array.isArray(value)) {
      return false;
    }
    if (_.isNull(value)) {
      return true;
    }
    return false;
  },
  object: (value) => {
    if (_.isUndefined(value)) {
      return false;
    }
    return true;
  },
};

class Schema {
  addCheck(check) {
    this.checks.push(check);
  }

  isValid(value) {
    const requeriedCheck = typeMapping[this.type];
    if (!requeriedCheck(value, this.requiredValue)) {
      return false;
    }
    const failedChecksCount = this.checks
      .map((check) => check(value))
      .filter((error) => !error)
      .length;
    return failedChecksCount === 0;
  }
}

export default Schema;
