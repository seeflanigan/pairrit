const _ = require('lodash');
const pairrit = require('../lib/pairrit');
const SHA256  = require('crypto-js/sha256');

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

  const newPair = pairrit[message](newOpts);

  const newPairState = {};

  if (newPair !== undefined) {
    newPairState[key] = newPair;
    return _.extend(newPairState, currentState);
  } else {
    delete currentState[key];
    return currentState;
  }
};

function listPairs(currentState, channel) {
  return _.filter(currentState, ['channel', channel]);
}

module.exports = {
  update: updatePair,
  list: listPairs
}
