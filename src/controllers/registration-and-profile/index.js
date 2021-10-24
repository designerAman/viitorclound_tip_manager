const chalk = require('chalk');
const fs = require('fs');

const handleError = require('../handle-error');
const registrationAndProfileUseCases = require('../../use-cases').registrationAndProfile;

const makeSignUpAction = require('./sign-up');
const signUpAction = makeSignUpAction({
  chalk,
  fs,
  signUp: registrationAndProfileUseCases.signUp,
  handleError,
});

const makeLoginAction = require('./login');
const loginAction = makeLoginAction({
  chalk,
  login: registrationAndProfileUseCases.login,
  handleError,
});

module.exports = Object.freeze({
  signUpAction,
  loginAction,
});