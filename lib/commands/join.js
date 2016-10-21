var _ = require('lodash/fp');

module.exports = function(userName, pairState) {
  const newParticipants = _.uniq(_.concat(pairState.participants, userName));
  const newPair         = _.extend(pairState, {participants: newParticipants});

  return newPair;
};

