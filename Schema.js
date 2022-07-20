class Schema {
  addCheck(check) {
    this.checks.push(check);
  }

  isValid(value) {
    if (this.requiredValue && !value) {
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
