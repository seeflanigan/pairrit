function deriveNameFrom(options) {
  if(options.pairName) {
    return options.pairName;
  }

  return(options.userName);
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

