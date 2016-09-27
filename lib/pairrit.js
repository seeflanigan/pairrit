const _ = require('lodash');
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

  const newPair = this[message](newOpts);

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
};

function joinOrCreatePair(options) {
  const newPair = Object.assign(
    {
      channel: options.pairChannel,
      name: options.pairName,
      participants: new Set()
    },
    options.pairState
  );

  newPair.participants.add(options.userName)

  return newPair;
};

function leavePair(options) {
  const newPair = Object.assign({}, options.pairState);

  newPair.participants.delete(options.userName);

  if (newPair.participants.size === 0) {
    return undefined;
  } else {
    return newPair;
  };
}

module.exports = {
  join:    joinOrCreatePair,
  leave:   leavePair,
  list:    listPairs,
  update:  updatePair
};
