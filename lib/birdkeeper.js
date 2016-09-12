var pairrit = require('../lib/pairrit');
var SHA256  = require('crypto-js/sha256');

function updatePair(options, currentState) {
  var message   = options.command;
  var key       = SHA256(options.pairName);
  var pairState = currentState[key];
  var newOpts   = Object.assign({pairState: pairState}, options)

  return { [key]: pairrit[message](newOpts) };
}

module.exports = {
  update: updatePair
}
