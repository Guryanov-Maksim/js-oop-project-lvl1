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
