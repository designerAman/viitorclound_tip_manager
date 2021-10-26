const chalk = require('chalk');

const tipUseCases = require('../../use-cases').tips;
const handleError = require('../handle-error');

const makeCalculateTipAction = require('./calculate-tip');
const calculateTipAction = makeCalculateTipAction({
  chalk,
  calculateTip: tipUseCases.calculateTip,
  handleError,
});

const makeGetTipsAction = require('./get-tips');
const getTipsAction = makeGetTipsAction({
  chalk,
  getTips: tipUseCases.getTips,
  handleError,
});

module.exports = Object.freeze({
  calculateTipAction,
  getTipsAction,
});
