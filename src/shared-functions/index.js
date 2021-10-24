const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Joi = require('joi');
const uuid = require('uuid');

const DB = require('../data-access');
const exceptions = require('../exceptions');

const makeValidatePassword = require('./validate-password');
const validatePassword = makeValidatePassword();

const makeCreateStringHash = require("./create-string-hash");
const createStringHash = makeCreateStringHash({
  bcrypt,
});

const makeSendEmail = require("./send-email");
const sendEmail = makeSendEmail({
  nodemailer,
});

const makeGetAccessToken = require("./get-access-token");
const getAccessToken = makeGetAccessToken({
  Joi,
  uuid,
  userDb: DB.userDb,
  ValidationError: exceptions.ValidationError,
});

const makeVerifyHashedString = require("./verify-hashed-string");
const verifyHashedString = makeVerifyHashedString({
  bcrypt
});


module.exports = Object.freeze({
  validatePassword,
  createStringHash,
  sendEmail,
  getAccessToken,
  verifyHashedString,
});