const Joi = require('joi');
const momentTZ = require('moment-timezone');
const uuid = require('uuid');

const DB = require('../../data-access');
const exceptions = require('../../exceptions');
const sharedFunctions = require('../../shared-functions');

const makeSignUp = require('./sign-up');
const signUp = makeSignUp({
  Joi,
  momentTZ,
  userDb: DB.userDb,
  validatePassword: sharedFunctions.validatePassword,
  createStringHash: sharedFunctions.createStringHash,
  getAccessToken: sharedFunctions.getAccessToken,
  sendEmail: sharedFunctions.sendEmail,
  ValidationError: exceptions.ValidationError,
  AlreadyExistsError: exceptions.AlreadyExistsError,
});

const makeLogin = require('./login');
const login = makeLogin({
  Joi,
  userDb: DB.userDb,
  verifyHashedString: sharedFunctions.verifyHashedString,
  getAccessToken: sharedFunctions.getAccessToken,
  ValidationError: exceptions.ValidationError,
  NotFoundError: exceptions.NotFoundError,
  AuthorizationError: exceptions.AuthorizationError,
});

module.exports = Object.freeze({
  signUp,
  login,
});
