const filter = require('lodash').filter;

module.exports = function(currentState, channel) {
  return filter(currentState, ['channel', channel]);
};

