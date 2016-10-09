var _ = require('lodash/fp');

function deriveNameFrom({pairName, userName}) {
  return _.first(_.compact([pairName, userName]))
}

module.exports = function(options) {
  const newPair = Object.assign(
    {
      channel: options.pairChannel,
      name: deriveNameFrom(options),
      participants: new Set()
    },

    options.pairState
  );

  newPair.participants.add(options.userName)

  return newPair;
};

