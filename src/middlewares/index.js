const multer = require('multer');

const config = require('../config/environments');

const makeUploadImages = require('./upload-images');
const uploadImages = makeUploadImages({
  config,
  multer,
})

module.exports = Object.freeze({
  uploadImages,
});