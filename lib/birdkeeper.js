var _ = require('lodash');
var pairrit = require('../lib/pairrit');
var SHA256  = require('crypto-js/sha256');

function generateKey(channelName, pairName) {
  return SHA256(`${channelName}-${pairName}`);
};

function lookupPair(currentState, key) {
  return currentState[key];
};

function updatePair(currentState, options) {
  var key          = generateKey(options.pairChannel, options.pairName);
  var pairState    = lookupPair(currentState, key);

  var message      = options.command;
  var newOpts      = Object.assign({pairState: pairState}, options);

  var newPairState = { [key]: pairrit[message](newOpts) };

  return _.extend(newPairState, currentState);
}

module.exports = {
  update: updatePair
}
