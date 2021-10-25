const chalk = require('chalk');

const tipUseCases = require('../../use-cases').tips;
const handleError = require('../handle-error');

const makeCalculateTipAction = require('./calculate-tip');
const calculateTipAction = makeCalculateTipAction({
  chalk,
  calculateTip: tipUseCases.calculateTip,
  handleError,
});

module.exports = Object.freeze({
  calculateTipAction,
});
