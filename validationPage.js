// Клас валідації – використовує об'єкт validationRules
class ValidationPage {
  constructor() {
    this.errors = {};
  }

  static validatePattern(value, pattern) {
    return new RegExp(pattern).test(value);
  }

  static validateMinLength(value, minLength) {
    if (!value) return false;
    return value.length >= minLength;
  }

  validateName(value, key) {
    const rule = validationRules[key];
    this.errors[key] = [];

    if (!value) {
      this.errors[key].push(rule.errorMessages.required);
    } else {
      if (!ValidationPage.validatePattern(value, rule.letters)) {
        this.errors[key].push(rule.errorMessages.letters);
      }
      if (!ValidationPage.validatePattern(value, rule.capital)) {
        this.errors[key].push(rule.errorMessages.capital);
      }
    }
    if (this.errors[key].length === 0) delete this.errors[key];
  }

  validateEmail(email) {
    const rule = validationRules.email;
    this.errors.email = [];

    if (!email) {
      this.errors.email.push(rule.errorMessages.required);
    } else if (!ValidationPage.validatePattern(email, rule.pattern)) {
      this.errors.email.push(rule.errorMessages.pattern);
    }
    if (this.errors.email.length === 0) delete this.errors.email;
  }

  validatePassword(password) {
    const rule = validationRules.password;
    const msg = rule.errorMessages;
    this.errors.password = [];

    if (!password) {
      this.errors.password.push(msg.required);
    } else {
      if (!ValidationPage.validateMinLength(password, rule.minLength)) this.errors.password.push(msg.minLength);
      if (!ValidationPage.validatePattern(password, rule.uppercase)) this.errors.password.push(msg.uppercase);
      if (!ValidationPage.validatePattern(password, rule.lowercase)) this.errors.password.push(msg.lowercase);
      if (!ValidationPage.validatePattern(password, rule.number)) this.errors.password.push(msg.number);
      if (!ValidationPage.validatePattern(password, rule.specialCharacter)) this.errors.password.push(msg.specialCharacter);
      if (!ValidationPage.validatePattern(password, rule.noSpace)) this.errors.password.push(msg.noSpace);
    }
    if (this.errors.password.length === 0) delete this.errors.password;
  }

  validateForm(data) {
    this.errors = {};
    this.validateName(data.firstName, 'firstName');
    this.validateName(data.lastName, 'lastName');
    this.validateEmail(data.email);
    this.validatePassword(data.password);
    return this.errors;
  }
}
