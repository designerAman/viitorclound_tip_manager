const Joi = require('joi');
const momentTZ = require('moment-timezone');

const DB = require('../../data-access')
const exceptions = require('../../exceptions');

const makeCalculateTip = require('./calculate-tip');
const calculateTip = makeCalculateTip({
  Joi,
  momentTZ,
  tipDb: DB.tipDb,
  ValidationError: exceptions.ValidationError,
});

module.exports = Object.freeze({
  calculateTip,
});
