module.exports = function(options) {
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
