const extend = require('lodash').extend;
const filter = require('lodash').filter;
const SHA256 = require('crypto-js/sha256');

function generateKey(pairChannel, pairName) {
  return SHA256(`${pairChannel}-${pairName}`);
};

function lookupPair(currentState, key) {
  return currentState[key];
};

function updatePair(currentState, options) {
  const key       = generateKey(options.pairChannel, options.pairName);
  const pairState = lookupPair(currentState, key);

  const message   = options.command;
  const newOpts   = Object.assign({pairState: pairState}, options);

  const newPair = this[message](newOpts);

  const newPairState = {};

  if (newPair !== undefined) {
    newPairState[key] = newPair;
    return extend(newPairState, currentState);
  } else {
    delete currentState[key];
    return currentState;
  }
};

function listPairs(currentState, channel) {
  return filter(currentState, ['channel', channel]);
};

module.exports = {
  join:    require('./commands/join'),
  leave:   require('./commands/leave'),
  list:    require('./commands/list'),
  update:  updatePair
};

