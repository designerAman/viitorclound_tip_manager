const multer = require('multer');
const chalk = require('chalk');

const config = require('../config/environments');
const DB = require('../data-access');
const exceptions = require('../exceptions');
const handleError = require('../controllers/handle-error');

const makeUploadImages = require('./upload-images');
const uploadImages = makeUploadImages({
  config,
  multer,
});

const makeVerifyUserAccessToken = require('./verify-user-access-token');
const verifyUserAccessToken = makeVerifyUserAccessToken({
  chalk,
  accessTokenDb: DB.accessTokenDb,
  AuthorizationError: exceptions.AuthorizationError,
  handleError,
});

module.exports = Object.freeze({
  uploadImages,
  verifyUserAccessToken,
});